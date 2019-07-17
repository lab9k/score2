/**
 * Options for different types of nodes.
 * commonProto is a set of options inherited by all.
 */
const commonProto = {
  fixed: false,
  clickable: true,
  size: 25
};

export const cityProto = {
  ...commonProto,
  group: 'city',
  mass: 5,
};

export const topicProto = {
  ...commonProto,
  group: 'topics',
  mass: 3
};

export const challengeProto = {
  ...commonProto,
  group: 'challenge',
  mass: 2
};

export const clusterProto = {
  ...commonProto,
  group: 'clusters',
  mass: 5
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
    ...clusterProto,
    ...legendProto,
    label: 'cluster'
  },
  {
    ...challengeProto,
    ...legendProto,
    label: 'challenge'
  },
  {
    ...topicProto,
    ...legendProto,
    label: 'topic'
  }
];

export default function getProto(type) {
  switch (type) {
    case 'clusters':
      return clusterProto;
    case 'topics':
      return topicProto;
    case 'challenge':
      return challengeProto;
    case 'city':
      return cityProto;
    default:
      return {};
  }
}
