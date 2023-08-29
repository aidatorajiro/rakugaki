// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "RakugakiLayers.sol";
import "defs.sol";

contract RakugakiNFT is ERC721 {
    IRakugakiLayers layersContract = IRakugakiLayers(0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46);

    constructor() ERC721("Rakugaki", "RGK") { }

    mapping (uint256 => NFTMeta) rakugakidatabase;

    function mint(uint256 _tokenId, string calldata _base_serial, uint256[] calldata _layers, uint256[] calldata _other_data) external {
        rakugakidatabase[_tokenId] = NFTMeta({leyers: _layers, base_serial: _base_serial, other_data: _other_data});
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
        public
        pure
        returns (string memory)
    {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">',
            '</svg>'
        );
    }
}