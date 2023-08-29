// SPDX-License-Identifier: MIT
pragma solidity 0.8;

contract RakugakiLayers {
    struct RakugakiLayer {
        string image;
        uint256 timestamp;
    }

    mapping (uint256 => RakugakiLayer) public allLayers;

    function addImage(uint256 id, string calldata data) public {
        require(bytes(allLayers[id].image).length == 0, "already registered");

        allLayers[id].image = data;
        allLayers[id].timestamp = block.number;
    }
}