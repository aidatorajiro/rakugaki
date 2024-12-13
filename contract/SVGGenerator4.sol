// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/utils/Strings.sol";

import "defs.sol";

contract SerialKasaneRand5 is ISVGGenerator {
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
        uint tss = uint256(keccak256(abi.encode(block.timestamp)));
        bytes memory addr_hex = abi.encodePacked(Strings.toHexString(msg.sender));
        bytes memory color = abi.encodePacked(addr_hex[8], addr_hex[9], addr_hex[10], addr_hex[11], addr_hex[12], addr_hex[13]);
        bytes memory config = abi.encodePacked(
            Strings.toString(tss & 7),
            Strings.toString((tss >> 7) & 7),
            Strings.toString((tss >> 14) & 7),
            Strings.toString((tss >> 21) & 7),
            Strings.toString((tss >> 28) & 7),
            Strings.toString((tss >> 35) & 7),
            Strings.toString((tss >> 38) & 3),
            Strings.toString((tss >> 41) & 3),
            Strings.toString((tss >> 44) & 3),
            Strings.toString((tss >> 47) & 3)
        );
        bytes memory tmp1 = abi.encodePacked(
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">',
'    <filter id="image">',
'        <feImage result="img1" href="', meta.layers_database.getLayer(arr[0]).image, '"/>',
'        <feImage result="img2" href="', meta.layers_database.getLayer(arr[1]).image, '"/>',
'        <feImage result="img3" href="', meta.layers_database.getLayer(arr[2]).image, '"/>',
'        <feImage result="img4" href="', meta.layers_database.getLayer(arr[3]).image, '"/>',
'        <feImage result="img5" href="', meta.layers_database.getLayer(arr[4]).image, '"/>',
'        <feDisplacementMap in="SourceGraphic" in2="img3" result="final" scale="30" xChannelSelector="R" yChannelSelector="G" />',
'        <feComposite in="final" in2="img1" operator="arithmetic" result="final" k1="1.', config[0] ,'" k2="1.', config[5] ,'" k3="0.', config[6] ,'" k4="-0.1" />',
'        <feComposite in="final" in2="img2" operator="arithmetic" result="final" k1="1.', config[1] ,'" k2="1.', config[0] ,'" k3="0.', config[7] ,'" k4="-0.1" />'
        );
        bytes memory tmp2 = abi.encodePacked(
'        <feComposite in="final" in2="img3" operator="arithmetic" result="final" k1="1.', config[2] ,'" k2="1.', config[1] ,'" k3="0.', config[8] ,'" k4="-0.1" />',
'        <feComposite in="final" in2="img4" operator="arithmetic" result="final" k1="1.', config[3] ,'" k2="1.', config[2] ,'" k3="0.', config[9] ,'" k4="-0.1" />',
'        <feComposite in="final" in2="img5" operator="arithmetic" result="final" k1="1.', config[4] ,'" k2="1.', config[3] ,'" k3="0.', config[6] ,'" k4="-0.1" />'
        );
        bytes memory tmp3 = abi.encodePacked(
'        <feComponentTransfer in="final" result="final">',
'            <feFuncR type="gamma" amplitude="1" exponent="', config[6] ,'.5" offset="0"></feFuncR>',
'            <feFuncG type="gamma" amplitude="1" exponent="', config[7] ,'.5" offset="0"></feFuncG>',
'            <feFuncB type="gamma" amplitude="1" exponent="', config[8] ,'.5" offset="0"></feFuncB>',
'        </feComponentTransfer>',
'    </filter>',
'    <g style="filter:url(#image);">',
'        <text x="0" y="8" font-family="Times New Roman, serif" font-size="12" transform="scale(6 50)" style="fill:#', color, ';" >', meta.base_serial,'</text>',
'    </g>',
'</svg>'
);
        return string(abi.encodePacked(tmp1, tmp2, tmp3));
    }
}