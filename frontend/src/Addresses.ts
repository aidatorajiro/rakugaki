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
        layerRange: [1, Infinity],
        address: "0x225DDb286Da538B78ae34B5372660a1313F75eE2"
        },
        {
        name: "もじ2",
        description: "もじがでるよ2",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: "0x03Cc0fFA70dE35970d80fB192a9DfFD4571f2303"
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
        address: "0x991C2623d55c392785b5016422169fddaE253148"
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: "0xc17E11D26d5052F574b2B9f2c4984824D616E80D"
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: "0x8d9e8C1B3e3C70555923c01b0ab1cA77830047a0"
        },
        {
        name: "もじ2",
        description: "もじがでるよ2",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: "0x225DDb286Da538B78ae34B5372660a1313F75eE2"
        },
    ],
    layerDatabase: "0x2FF13e8FD83D455a3064BC43992982a65ae0F3c2",
    nft: "0x3228db02e3943dCCb18dc630EB7034335e2B62Eb"
  }, // arbit one
  0x5: {
    compileKey: "paris18",
    generators: [
        {
        name: "ぐわぐわ",
        description: "ぐわぐわしてるよ",
        otherSpecs: undefined,
        layerRange: [2, 2],
        address: "0x06ae046986A584514E343fe6E3494D15E713E37a"
        },
        {
        name: "もじ",
        description: "もじがでるよ",
        otherSpecs: undefined,
        layerRange: [1, 5],
        address: "0x8c93fD1537529cEd54F8c0D43dC644883Fc55E4b"
        },
        {
        name: "たくさん",
        description: "たくさん",
        otherSpecs: undefined,
        layerRange: [-Infinity, Infinity],
        address: "0x06ae046986A584514E343fe6E3494D15E713E37a"
        },
    ],
    layerDatabase: "0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46",
    nft: "0xeb9779c9b66e16a95e16d28f6ed8241ba09ddd18"
  } // RIP goerli :(
};
