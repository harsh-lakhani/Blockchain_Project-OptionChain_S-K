// npx hardhat run scripts/deploy.ts  --network etherdata
// Contract deployed to: 0xEc404EC2202fb311d424A186C90dB859dff30c17 (option)
// Contract deployed to: 0xFc5Daf4100a5cC3189756Ed0a1d2864780d5bB67 (stable coin)
// Contract deployed to: 0xf61fF1341dFeAe4aCACb91cBe9a76f0310e12Ead (asset)
import { ethers } from "hardhat";

async function main() {

  const Contract1 = await ethers.getContractFactory("Options");
  const contract1 = await Contract1.deploy();
  await contract1.deployed();
  console.log("Options contract deployed to:", contract1.address);

  const Contract2 = await ethers.getContractFactory("SKCoin_stable_coin");
  const contract2 = await Contract2.deploy();
  await contract2.deployed();
  console.log("SKCoin_stable_coin contract deployed to:", contract2.address);

  const Contract3 = await ethers.getContractFactory("SKCoin_Unstable_Asset");
  const contract3 = await Contract3.deploy();
  await contract3.deployed();
  console.log("SKCoin_Unstable_Asset contract deployed to:", contract3.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});