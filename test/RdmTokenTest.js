const { expect, use } = require("chai");
const { ethers, upgrades} = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("RDMToken", function () {
  let owner,user1,user2,user3,user4,user5,user6,user7,user8;
  let rdmToken ,rdmTokenFactory

    beforeEach(async function () {
      [owner,user1,user2,user3,user4,user5,user6,user7,user8] = await ethers.getSigners();
      rdmTokenFactory = await ethers.getContractFactory("RdmToken");
      rdmToken = await rdmTokenFactory.deploy();

    });

    it("Mint Token", async()=>{
     expect(await rdmToken.totalSupply()).to.be.eq(ethers.parseEther("2000000000"));

     expect(await rdmToken.balanceOf(owner.address)).to.be.eq(ethers.parseEther("2000000000"))

     await rdmToken.mint(user1.address,ethers.parseEther("2000000000"));

     expect(await rdmToken.totalSupply()).to.be.eq(ethers.parseEther("4000000000"));

    })

    it("Mint Token MAX_SUPPLY", async()=>{
      expect(await rdmToken.totalSupply()).to.be.eq(ethers.parseEther("2000000000"));
 
      expect(await rdmToken.balanceOf(owner.address)).to.be.eq(ethers.parseEther("2000000000"))

      await expect(rdmToken.mint(user1.address,ethers.parseEther("8000000001") )).to.be.revertedWithCustomError(rdmToken,'CapReachedCheck');
 
      await rdmToken.mint(user1.address,ethers.parseEther("8000000000"));
 
      expect(await rdmToken.totalSupply()).to.be.eq(ethers.parseEther("10000000000"));

      await expect(rdmToken.mint(user1.address, 1)).to.be.revertedWithCustomError(rdmToken,'CapReachedCheck');
 
     })
     
     it("Mint Token with Another Account",async()=>{
      await expect(rdmToken.connect(user1).mint(user1.address,1)).to.be.revertedWith('Ownable: caller is not the owner')
      expect(await rdmToken.totalSupply()).to.be.eq(ethers.parseEther("2000000000"));

  
     })

     it('Zero Address Check',async()=>{
      await expect(rdmToken.mint('0x0000000000000000000000000000000000000000',10000)).to.be.revertedWithCustomError(rdmToken,'ZeroAddressCheck');
     })

   
  

  });