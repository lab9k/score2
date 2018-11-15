import { challengeProto, keywordProto } from './nodeOptions';
import { map } from 'lodash';
export default class Challenge {
  constructor(data) {
    this.data = data;
    this.title = data.title;
    this.description = data.description;
    this.topics = [];
    this.topics.push(...data.topics);
    this.keywords = [];
    this.keywords.push(...data.keywords);
  }

  get node() {
    return {
      label: this.title,
      ...challengeProto
    };
  }

  get keywordNodes() {
    return map(this.keywords, k => ({ label: k, ...keywordProto }));
  }
}
