// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";

// RakugakiLayers 0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46

contract RakugakiLayers is IRakugakiLayers {
    mapping (uint256 => RakugakiLayer) allLayers;

    function addImage(uint256 id, string calldata data) public {
        require(bytes(allLayers[id].image).length == 0, "already registered");

        allLayers[id].image = data;
        allLayers[id].timestamp = block.number;
    }

    function getLayer (uint256 id) public view returns (RakugakiLayer memory) {
        return allLayers[id];
    }
}