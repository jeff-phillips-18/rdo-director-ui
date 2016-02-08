export default [
  {
    name: 'Baremetal',
    hwSpecs: '1CPU, 40GB RAM, HDD 500GB',
    roles: [
      {
        name: 'Controller',
        nodeCount: 3
      },
      {
        name: 'Compute',
        nodeCount: 1
      }
    ],
    nodeCount: 20
  },
  {
    name: 'Flavor2',
    hwSpecs: '1CPU, 20GB RAM, HDD 250GB',
    roles: [],
    nodeCount: 10
  }
];
