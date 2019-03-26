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

export const topicProto = {
  ...commonProto,
  group: 'topics'
};

export const challengeProto = {
  ...commonProto,
  group: 'challenge'
};

export const clusterProto = {
  ...commonProto,
  group: 'clusters'
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
    ...topicProto,
    ...legendProto,
    label: 'topic'
  },
  {
    ...challengeProto,
    ...legendProto,
    label: 'challenge'
  },
  {
    ...clusterProto,
    ...legendProto,
    label: 'cluster'
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
