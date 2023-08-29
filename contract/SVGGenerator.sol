// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";

contract SVGGeneratorVer1 is ISVGGenerator {
    function generate(NFTMeta memory meta)
        public
        view
        returns (string memory)
    {
        string memory image_string = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">';
        
        for (uint256 i = 0; i < meta.layers.length; i++) {
            uint256 layer_id = meta.layers[i];
            image_string = string.concat(image_string, meta.layers_database.getLayer(layer_id).image);
        }

        return string.concat(
            image_string,
            '</svg>'
        );
    }
}