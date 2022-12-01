import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given MyToken", function () {
  it("Owner should get the initial supply", async function () {

    // get the list of accounts that are available in the network
    const [owner1,owner2] = await ethers.getSigners();
    
    //same as the contract name
    const MyToken = await ethers.getContractFactory("MSBD5017Token");
    
    //wait fot the contract to be deployed
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    //get balance of the owner
    const ownerBalance1 = await myToken.balanceOf(owner1.address);
    const ownerBalance2 = await myToken.balanceOf(owner2.address);

    expect(ownerBalance1).to.equal(1000);
    await myToken.approve(owner2.address,200)
    await myToken.transfer(owner2.address,100);

    const ownerBalance11 = await myToken.balanceOf(owner1.address);
    const ownerBalance22 = await myToken.balanceOf(owner2.address);
    console.log("Owner address: ", owner1.address);
    console.log("Owner balance: ", ownerBalance11.toString());
    console.log("Owner address: ", owner2.address);
    console.log("Owner balance: ", ownerBalance22.toString());
 
    console.log("Contractt address: ",  myToken.address);

  });
});