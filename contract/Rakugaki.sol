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
        _safeMint(msg.sender, _tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        string memory image = Base64.encode(bytes(generateSVGImage(tokenId)));
        return string(
                            abi.encodePacked(
                                '{"name":"Rakugaki"',
                                ', "description":"Rakugaki", "image": "',
                                'data:image/svg+xml;base64,',
                                image,
                                '"}'
                            )
            );
    }

    function generateSVGImage(uint256 tokenId)
        internal
        pure
        returns (string memory)
    {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">',
            '<image x="90" y="-65" width="128" height="146" xlink:href="https://en.wikipedia.org/static/images/icons/wikipedia.png"/>'
            '</svg>'
        );
    }
}