// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Ocean is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Ocean", "OCE")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        console.log("We got here", tokenId, msg.sender);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function buyToken() public payable {
        uint tokenId = _nextTokenId;
        require(msg.value == 0.01 ether, "Ocean: Price is 0.01 ether");
        _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}