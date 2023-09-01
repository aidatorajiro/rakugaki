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
'    <filter id="image">',
'        <feImage result="img1" href="', meta.layers_database.getLayer(meta.layers[0]).image, '"/>',
'        <feImage result="img2" href="', meta.layers_database.getLayer(meta.layers[1]).image, '"/>',
'        <feImage result="img3" href="', meta.layers_database.getLayer(meta.layers[2]).image, '"/>',
'        <feImage result="img4" href="', meta.layers_database.getLayer(meta.layers[3]).image, '"/>',
'        <feImage result="img5" href="', meta.layers_database.getLayer(meta.layers[4]).image, '"/>',
'        <feDisplacementMap in="SourceGraphic" in2="img1" result="final" scale="2" xChannelSelector="R" yChannelSelector="G" />',
'        <feComposite in="final" in2="img1" operator="arithmetic" result="final" k1="2" k2="1" k3="1" k4="0" />',
'        <feComposite in="final" in2="img2" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img3" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img4" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img5" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComponentTransfer in="final" result="final">',
'            <feFuncR type="gamma" amplitude="1" exponent="2" offset="0"></feFuncR>',
'            <feFuncG type="gamma" amplitude="1" exponent="5" offset="0"></feFuncG>',
'            <feFuncB type="gamma" amplitude="1" exponent="2" offset="0"></feFuncB>',
'        </feComponentTransfer>',
'    </filter>',
'    <text x="0" y="8" font-family="Verdana" font-size="12" transform="scale(6 50)" style="filter:url(#image);fill:#F89723;" >', meta.base_serial,'</text>',
'</svg>'
));
    }
}