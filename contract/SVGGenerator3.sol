// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


// 0x06ae046986A584514E343fe6E3494D15E713E37a

contract SVGGeneratorDisp2 is ISVGGenerator {
    function generate(NFTMeta memory meta)
        public
        view
        returns (string memory)
    {
        string memory partA;
        string memory partB;
        for (uint i = 0; i < meta.layers.length; i++) {
            string memory tost = Strings.toString(i);
            string memory imgdata = meta.layers_database.getLayer(meta.layers[i]).image;
            partA = string.concat(partA, '<feImage result="img', tost, '" href="', imgdata, '"/>');
            partB = string.concat(partB, '<feComposite in="final" in2="img', tost, '" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />');
        }
        return string(abi.encodePacked(
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">',
'    <filter id="image">',
partA,
'        <feDisplacementMap in2="img3" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G" result="final"/>',
partB,
'        <feComponentTransfer in="final" result="final">',
'          <feFuncR type="gamma" amplitude="1" exponent="2" offset="0"></feFuncR>',
'          <feFuncG type="gamma" amplitude="1" exponent="2" offset="0"></feFuncG>',
'          <feFuncB type="gamma" amplitude="1" exponent="2" offset="0"></feFuncB>',
'        </feComponentTransfer>',
'    </filter>',
'    <g filter="url(#image)">',
'        <rect x="0" y="0" width="100%" height="100%" style="fill:#000000;" />',
'        <text x="100" y="250" font-family="Verdana" font-size="33"  style="fill:#ffffff70;">', meta.base_serial, '</text>',
'    </g>',
'</svg>'
));
    }
}