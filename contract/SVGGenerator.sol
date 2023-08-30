// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";

// 0x06ae046986A584514E343fe6E3494D15E713E37a

contract SVGGeneratorDisp2 is ISVGGenerator {
    function generate(NFTMeta memory meta)
        public
        view
        returns (string memory)
    {
        return string(abi.encodePacked(
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">',
    '<filter id="image">',
        '<feImage result="img1" href="', meta.layers_database.getLayer(meta.layers[0]).image, '"/>',
        '<feImage result="img2" href="', meta.layers_database.getLayer(meta.layers[1]).image, '"/>',
        '<feDisplacementMap in2="img1" in="img2" result="disp" scale="30" xChannelSelector="R" yChannelSelector="G" />',
        '<feBlend in="img1" in2="disp" mode="multiply" />',
    '</filter>',
    '<rect x="0%" y="0%" width="100%" height="100%" style="filter:url(#image);" />',
'</svg>'));
    }
}