module.exports.config = {
  mainnet: {
    dataSources: [],
    templates: [],
  },
  "arbitrum-one": {
    dataSources: [],
    templates: [],
  },
  celo: {
    dataSources: [],
    templates: [],
  },
  kovan: {
    dataSources: [],
    templates: [],
  },
  xdai: {
    dataSources: [],
    templates: [],
  },
  rinkeby: {
    dataSources: [
      {
        name: "poster",
        template: "poster-ds.yaml",
        address: "0x917d84787A266F9D649d519A7Ec8445eA43514D8",
        startBlock: 10065090,
      },
    ],
    templates: [],
  },
  matic: {
    dataSources: [],
    templates: [],
  },
};
