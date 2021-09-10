import { compact, filter, flatMap, includes, map, uniqBy } from 'lodash';
import { challengeProto, cityProto, topicProto, clusterProto } from '../models';

export const extractData = (arr) => {
  let count = 0;
  return map(arr, (entry) => {
    const {
      City: city,
      Description: description,
      topics: keywords,
      Title: title,
      keywords: topics,
    } = entry;
    return {
      city,
      description,
      title,
      keywords: keywords.split(', ').filter((t) => t !== ''),
      topics: topics.split(', ').filter((t) => t !== ''),
      id: ++count,
      label: city,
    };
  });
};

export const extractCities = (arr) => {
  return filter(
    map(uniqBy(arr, 'city'), (val) => val.city),
    (val) => val !== ''
  );
};

export const getCityToChallengeToKeyword = (challenges, topic) => {
  const cities = extractCities(challenges);
  let counter = 0;
  return compact(
    map(cities, (city) => {
      const challengesForCity = filter(
        challenges,
        (c) => c.city === city && includes(c.topics, topic)
      );
      if (challengesForCity.length <= 0) return null;
      return {
        challenges: map(challengesForCity, (ch) => ({
          ...ch,
          ...challengeProto,
          label: ch.title,
          id: ++counter,
          keywords: map(ch.keywords, (kw) => ({
            ...topicProto,
            label: kw,
            id: ++counter,
          })),
        })),
        ...cityProto,
        label: city,
        id: ++counter,
      };
    })
  );
};

export const getCityToTopic = (challenges) => {
  const cities = extractCities(challenges);
  let counter = 0;
  return map(cities, (city) => {
    const cityChallenges = filter(challenges, (c) => c.city === city);
    const cityTopics = flatMap(cityChallenges, (cch) => cch.topics);
    return {
      ...cityProto,
      label: city,
      id: ++counter,
      topics: map(cityTopics, (topic) => ({
        ...clusterProto,
        label: topic,
        id: ++counter,
      })),
    };
  });
};
