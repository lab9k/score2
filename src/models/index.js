/**
 * Options for different types of nodes.
 * commonProto is a set of options inherited by all.
 */
const commonProto = {
  mass: 1,
  fixed: false,
  clickable: true
};

export const cityProto = {
  ...commonProto,
  group: 'city'
};

export const keywordProto = {
  ...commonProto,
  group: 'keywords'
};

export const challengeProto = {
  ...commonProto,
  group: 'challenge'
};

export const topicProto = {
  ...commonProto,
  group: 'topics'
};

export const legendProto = {
  clickable: false,
  fixed: true,
  physics: false,
  size: 25
};

export const legendNodes = [
  {
    ...cityProto,
    ...legendProto,
    label: 'city'
  },
  {
    ...keywordProto,
    ...legendProto,
    label: 'topic'
  },
  {
    ...challengeProto,
    ...legendProto,
    label: 'challenge'
  },
  {
    ...topicProto,
    ...legendProto,
    label: 'cluster'
  }
];

export default function getProto(type) {
  switch (type) {
    case 'topics':
      return topicProto;
    case 'keywords':
      return keywordProto;
    case 'challenge':
      return challengeProto;
    case 'city':
      return cityProto;
    default:
      return {};
  }
}
