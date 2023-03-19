// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "cryptoDev721.sol";

contract cryptoDevToken is ERC20{
    ERC cryptoDev721;
    constructor(address addr) ERC20("CRY","CRYS"){
        cryptoDev721 = ERC(addr);
    }

    uint256 public amount = 10**18;
    uint256 public minted = 0;
    address internal owner = msg.sender;


    function mint() public payable{
        require(minted <= 1000,"total limit of token has been reached");
        require(msg.value == 10**15 ,"fees is not transfered 0.0001 eth");
        _mint(msg.sender,amount);
        minted = minted + 1;
        getFreeNFT();
    }

    function getFreeNFT() internal {
        if(balanceOf(msg.sender) == 3*amount){
            cryptoDev721.mint(msg.sender);
        }
    }

    function ownerOf721(uint256 _tokenId) public view returns(address ){
        return cryptoDev721.ownerOf(_tokenId);
    }

    function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        require(msg.sender == owner);
        (bool sent, bytes memory data) = _to.call{value:address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable{}
    fallback() external payable{}
}
