// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title RdmToken - ERC20 Token 
/// @dev This contract represents the RdmToken, an ERC20 token
contract RdmToken is ERC20,Ownable {

   /// @dev Total supply cap for RDM Token
    uint public constant MAX_SUPPLY = 10_000_000_000 * 10 ** 18;

    // EVENT

    /// @dev Emitted when new tokens are minted.
    event Minted(address indexed user, uint _amount);


    //CUSTOM ERROR

    /// @dev Custom error for zero address check.
    error ZeroAddressCheck();

    /// @dev Custom error for total supply cap reached check.
    error CapReachedCheck();


    /// @dev Constructor for initializing the contract with initial mint to the owner 
    constructor() ERC20("RdmToken", "RDM") Ownable() {
        // Mint initial tokens to the owner of contract 
       _mint(msg.sender, 2_000_000_000 * (10**18));
    }
  

   /// @dev Function to mint new tokens, can only be called by the Owner
   /// @param _user The address to which new tokens will be minted
   /// @param _amount The amount of tokens to mint
   function mint(address _user, uint _amount) external onlyOwner{
      if (totalSupply() + _amount > MAX_SUPPLY) {
        revert CapReachedCheck();
      }
      if(_user==address(0)){
        revert ZeroAddressCheck();
      }
      _mint(_user,_amount );

      emit Minted(_user, _amount);
    }
}