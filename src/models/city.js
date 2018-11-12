import { map, flatMap } from 'lodash';
import Challenge from './challenge';
import { cityProto, topicProto } from './options';
export default class City {
  constructor(name) {
    this.name = name;
    this.challenges = [];
  }

  addChallenges(...challenges) {
    this.challenges.push(...map(challenges, c => new Challenge(c)));
  }

  get topics() {
    return flatMap(this.challenges, c => c.topics);
  }

  get topicNodes() {
    return map(this.topics, t => ({
      label: t,
      ...topicProto
    }));
  }

  get node() {
    return {
      label: this.name,
      ...cityProto
    };
  }

  get challengeNodes() {
    return map(this.challenges, c => c.node);
  }

  get keywordNodes_all() {
    return flatMap(this.challenges, c => c.keywordNodes);
  }
}
