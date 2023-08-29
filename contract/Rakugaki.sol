// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Rakugaki is ERC721 {
    constructor() ERC721("Rakugaki", "RGK") {
    }

    struct RakugakiMetadata {
        string[] imagedata;
        string serial;
    }

    mapping (uint256 => RakugakiMetadata) rakugakidatabase;

    function mint(uint256 _tokenId, string calldata _serial, string[] calldata _img) external {
        rakugakidatabase[_tokenId] = RakugakiMetadata({imagedata: _img, serial: _serial});
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        string memory image = Base64.encode(bytes(generateSVGImage(tokenId)));
        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"Rakugaki"',
                                ', "description":"Rakugaki", "image": "',
                                'data:image/svg+xml;base64,',
                                image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function generateSVGImage(uint256 tokenId)
        internal
        pure
        returns (string memory)
    {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300">',
            '<style>',
            '.text1{font:bold 45px sans-serif;stroke:#afb;}',
            '.text2{font:italic 200px cursive;}',
            '.text3{font:italic 20px serif;}',
            '</style>',
            '<radialGradient id="Gradient" cx="0.6" cy="0.6" r="0.8">',
            '<stop offset="0%" stop-color="#258"/>',
            '<stop offset="50%" stop-color="#607"/>',
            '<stop offset="100%" stop-color="#112"/>',
            '</radialGradient>',
            '<filter id="shadow">',
            '<feDropShadow/>',
            '</filter>',
            '<filter id="blur">',
            '<feGaussianBlur in="SourceGraphic" stdDeviation="7"/>',
            '</filter>',
            '<rect width="480" height="300" rx="15" ry="15" fill="url(#Gradient)"/>',
            '<circle cx="110" cy="110" r="70" fill="#f55" filter="url(#blur)"/>',
            '<text x="30" y="190" class="text2" filter="url(#shadow)" fill="#ff0">',
            'Cool',
            '<animateMotion dur="20s" repeatCount="indefinite" path="M-50,30 C-50,-70 110,130 110,30 C110-70 -50,130 -50,30 z"/>',
            '</text>',
            '<text x="0" y="160" class="text1" filter="url(#shadow)">',
            'NonfunginbleToken',
            '<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-10 240 150" to="10 240 150" dur="10s" repeatCount="indefinite"/>',
            '</text>',
            '<text x="20" y="290" class="text3" fill="#ddd">',
            '#',
            Strings.toString(tokenId),
            '</text>',
            '</svg>'
        );
    }
}