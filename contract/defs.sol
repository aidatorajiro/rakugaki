// SPDX-License-Identifier: MIT
pragma solidity 0.8;

struct NFTMeta {
    uint256[] other_data;
    uint256[] layers;
    string base_serial;
    IRakugakiLayers layers_database;
    ISVGGenerator generator;
}

struct RakugakiLayer {
    string image;
    uint256 timestamp;
}

interface IRakugakiLayers {
    function getLayer (uint256) external view returns (RakugakiLayer memory);
}

interface ISVGGenerator {
    function generate (NFTMeta memory meta) external view returns (string memory);
}