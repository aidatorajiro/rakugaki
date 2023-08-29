// SPDX-License-Identifier: MIT
pragma solidity 0.8;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "RakugakiLayers.sol";
import "defs.sol";

contract RakugakiNFT is ERC721 {
    // IRakugakiLayers layersContract = IRakugakiLayers(0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46);

    constructor() ERC721("Rakugaki", "RGK") { }

    mapping (uint256 => NFTMeta) NFTMetaDatabase;

    function mint(uint256 _tokenId, uint256[] calldata _other_data, uint256[] calldata _layers, string calldata _base_serial, IRakugakiLayers _layers_database, ISVGGenerator _generator) external {
        NFTMetaDatabase[_tokenId] = NFTMeta({leyers: _layers, base_serial: _base_serial, other_data: _other_data, layers_database: _layers_database, generator: _generator});
        _safeMint(msg.sender, _tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        NFTMeta memory meta = NFTMetaDatabase[tokenId];
        string memory image = Base64.encode(bytes(meta.generator.generate(NFTMetaDatabase[tokenId])));
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
}