// SPDX-License-Identifier: MIT
pragma solidity 0.8;

struct NFTMeta {
    uint256[] other_data;
    uint256[] leyers;
    string base_serial;
}

struct RakugakiLayer {
    string image;
    uint256 timestamp;
}

interface IRakugakiLayers {
    function getLayer(uint256) external returns (RakugakiLayer memory);
}

interface ISVGGenerator {
    function generate (IRakugakiLayers layersContract, NFTMeta memory meta) external returns (string memory);
}