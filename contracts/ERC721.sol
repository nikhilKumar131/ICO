// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";

contract ERC is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address addr;
    address owner;

    constructor() ERC721("CRY721","CRYS721") {
        owner = msg.sender;
    }

    function setAddr(address _addr) public {
        require(msg.sender == owner, " only owner can set Addr");
        addr = _addr;
    }

    function mint(address to ) external {
        require(msg.sender == addr,"only setAddr can call mint function");
        uint256 tokenId = Counters.current(_tokenIds);
        _mint( to,  tokenId);
        Counters.increment(_tokenIds);
    }

}
