import { expect } from "chai";
import { ethers } from "hardhat";

describe("Given SKCoin_stable_coin", function () {
  it("Mint correct", async function () {

    // get the list of accounts that are available in the network
    const [owner] = await ethers.getSigners();

    //same as the contract name
    const MyToken = await ethers.getContractFactory("SKCoin_stable_coin");
    
    //wait fot the contract to be deployed
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    const ownerBalance = await myToken.balanceOf(owner.address);
    console.log("Owner address: ", owner.address);
    console.log("Updated owner balance: ", ownerBalance.toString());
    console.log("Contract address: ",  myToken.address);
    expect(ownerBalance).to.equal(100000);
  });
});