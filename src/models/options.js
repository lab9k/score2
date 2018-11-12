const commonProto = {
  shape: 'hexagon',
  mass: 3,
  fixed: false,
  font: {
    size: 24
  }
};

export const cityProto = {
  ...commonProto,
  type: 'city',
  color: 'rgba(57,62,70,1)'
};

export const keywordProto = {
  ...commonProto,
  type: 'keywords',
  color: 'rgba(0, 173, 181, 1)'
};

export const challengeProto = {
  ...commonProto,
  type: 'challenge',
  color: 'rgba(248, 181, 0, 1)'
};

export const topicProto = {
  ...commonProto,
  type: 'topics',
  color: 'rgba(252, 60, 60, 1)'
};

export const legendNodes = [
  {
    ...cityProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 0,
    label: 'city'
  },
  {
    ...keywordProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 50,
    label: 'keyword'
  },
  {
    ...challengeProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 100,
    label: 'challenge'
  },
  {
    ...topicProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 150,
    label: 'topic'
  }
];
