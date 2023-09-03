// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "defs.sol";

// v1 0x1DDD1318d7EeB90C2B9B16a688DCd108781BFFB3
// v2 0x3e153313A12c528E988b544Ea39f2c0D51E5399F
// v3 0x8c93fD1537529cEd54F8c0D43dC644883Fc55E4b

contract SerialKasane is ISVGGenerator {
    function generate(NFTMeta memory meta)
        public
        view
        returns (string memory)
    {
        uint[] memory arr = new uint[](5);
        for (uint i = 0; i < meta.layers.length; i++) {
            arr[i] = meta.layers[i];
        }
        uint j = 0;
        for (uint i = meta.layers.length; i < 5; i++) {
            arr[i] = arr[j];
            j++;
        }
        return string(abi.encodePacked(
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">',
'    <filter id="image">',
'        <feImage result="img1" href="', meta.layers_database.getLayer(arr[0]).image, '"/>',
'        <feImage result="img2" href="', meta.layers_database.getLayer(arr[1]).image, '"/>',
'        <feImage result="img3" href="', meta.layers_database.getLayer(arr[2]).image, '"/>',
'        <feImage result="img4" href="', meta.layers_database.getLayer(arr[3]).image, '"/>',
'        <feImage result="img5" href="', meta.layers_database.getLayer(arr[4]).image, '"/>',
'        <feDisplacementMap in="SourceGraphic" in2="img3" result="final" scale="2" xChannelSelector="R" yChannelSelector="G" />',
'        <feComposite in="final" in2="img1" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img2" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img3" operator="arithmetic" result="final" k1="2" k2="1" k3="1" k4="0" />',
'        <feComposite in="final" in2="img4" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComposite in="final" in2="img5" operator="arithmetic" result="final" k1="2" k2="1" k3="0.1" k4="0" />',
'        <feComponentTransfer in="final" result="final">',
'            <feFuncR type="gamma" amplitude="1" exponent="2" offset="0"></feFuncR>',
'            <feFuncG type="gamma" amplitude="1" exponent="5" offset="0"></feFuncG>',
'            <feFuncB type="gamma" amplitude="1" exponent="2" offset="0"></feFuncB>',
'        </feComponentTransfer>',
'    </filter>',
'    <text x="0" y="8" font-family="Times New Roman, serif" font-size="12" transform="scale(6 50)" style="filter:url(#image);fill:#F89723;" >', meta.base_serial,'</text>',
'</svg>'
));
    }
}