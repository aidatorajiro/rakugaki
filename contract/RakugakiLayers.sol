// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";

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

