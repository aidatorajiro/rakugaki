export type GeneratorConfig = {
    name: string,
    description: string,
    otherSpecs?: string,
    layerRange: [number, number],
    address: string
}

export type CompileKey = "paris26" | "cancun26" | "paris18"

export type NetworkConfig = {
    compileKey: CompileKey,
    generators: GeneratorConfig[],
    layerDatabase: string,
    nft: string
};

export type AllNetworkConfig = {[networkId: number]: NetworkConfig};

export const ADDRESSES: AllNetworkConfig = {
  0xe708: {
    compileKey: "paris26",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: "0xc17E11D26d5052F574b2B9f2c4984824D616E80D"
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: "0x8d9e8C1B3e3C70555923c01b0ab1cA77830047a0"
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: "0x225DDb286Da538B78ae34B5372660a1313F75eE2"
        },
    ],
    layerDatabase: "0x3228db02e3943dCCb18dc630EB7034335e2B62Eb",
    nft: "0x991C2623d55c392785b5016422169fddaE253148"
  }, // linea
  0xa4b1: {
    compileKey: "cancun26",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: ""
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: ""
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: ""
        },
    ],
    layerDatabase: "",
    nft: ""
  }, // arbit one
  0xaa36a7: {
    compileKey: "cancun26",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: ""
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: ""
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: ""
        },
    ],
    layerDatabase: "",
    nft: ""
  }, // sepolia
  0xe705: {
    compileKey: "paris26",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: ""
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: ""
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: ""
        },
    ],
    layerDatabase: "",
    nft: ""
  }, // linea sepolia
  0x5: {
    compileKey: "paris18",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: ""
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: ""
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: ""
        },
    ],
    layerDatabase: "",
    nft: ""
  } // RIP goerli :(
};
