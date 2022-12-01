import { expect } from "chai";
import { ethers } from "hardhat";

describe("S-K.sol", function () {
  it("test function: get_sk_price", async function () {
    // get the list of accounts that are available in the network
    const [owner] = await ethers.getSigners();
    //same as the contract name
    const Options = await ethers.getContractFactory("Options");
    //wait fot the contract to be deployed
    const options = await Options.deploy();
    await options.deployed();

    const price = await options.get_sk_price(owner.address);
    expect(price).to.equal(1200);
  });

  // it("ERC20", async function () {
  //   // get the list of accounts that are available in the network
  //   const [writer,buyer] = await ethers.getSigners();
  //   //same as the contract name
  //   const Options = await ethers.getContractFactory("Options");
  //   const Stable_tocken = await ethers.getContractFactory("SKCoin_stable_coin");
  //   const Unstable_tocken = await ethers.getContractFactory("SKCoin_Unstable_Asset");
  //   //wait fot the contract to be deployed
  //   const options = await Options.deploy();
  //   const unstable_tocken = await Unstable_tocken.deploy();
  //   const stable_tocken = await Stable_tocken.deploy();
  //   await options.deployed();
  //   await unstable_tocken.deployed();
  //   await stable_tocken.deployed();


  //   //查看合约地址
  //   console.log("Contract options address: ", options.address);
  //   console.log("Contract unstable_tocken address: ", unstable_tocken.address);
  //   console.log("Contract stable_tockenaddress: ", stable_tocken.address);
  //   console.log("Contract writer: ", writer.address);
  //   console.log("Contract buyer: ", buyer.address);
  //   console.log("----------------------------");

  //    // 查看钱
  //    var writer_balance_stable = await stable_tocken.balanceOf(writer.address);
  //    var writer_balance_unstable = await unstable_tocken.balanceOf(writer.address);
  //    var buyer_balance_stable = await stable_tocken.balanceOf(buyer.address);
  //    var buyer_balance_unstable = await unstable_tocken.balanceOf(buyer.address);
  //    var option_balance_stable = await stable_tocken.balanceOf(options.address);
  //    var option_balance_unstable = await unstable_tocken.balanceOf(options.address);

  //    console.log("writer_balance_stable: ", writer_balance_stable.toString());
  //    console.log("writer_balance_unstable: ", writer_balance_unstable.toString());

  //    console.log("");

  //    console.log("buyer_balance_stable: ", buyer_balance_stable.toString());
  //    console.log("buyer_balance_unstable: ", buyer_balance_unstable.toString());
     
  //    console.log("");

  //    console.log("option_balance_stable: ", option_balance_stable.toString());
  //    console.log("option_balance_unstable: ", option_balance_unstable.toString());
  //    console.log("----------------------------");

  //   // 相互转帐
  //   //await stable_tocken.approve(options.address,20000);
  //   // await stable_tocken.approve(buyer.address,20000);
  //   // await unstable_tocken.approve(options.address,20000);
  //   // await stable_tocken.approve(buyer.address,20000);
  //   // await unstable_tocken.approve(options.address,20000);


  //   // await stable_tocken.transfer(options.address,10000);
  //   // await unstable_tocken.transfer(options.address,10000);
  //   // await stable_tocken.transfer(buyer.address,10000);
  //   // await unstable_tocken.transfer(buyer.address,10000);
  //   // await unstable_tocken.approve(writer.address,900);




  //   // 查看钱
  //   var writer_balance_stable = await stable_tocken.balanceOf(writer.address);
  //   var writer_balance_unstable = await unstable_tocken.balanceOf(writer.address);

  //   var option_balance_stable = await stable_tocken.balanceOf(options.address);
  //   var option_balance_unstable = await unstable_tocken.balanceOf(options.address);

  //   var buyer_balance_stable = await stable_tocken.balanceOf(buyer.address);
  //   var buyer_balance_unstable = await unstable_tocken.balanceOf(buyer.address);
  
  //   console.log("writer_balance_stable: ", writer_balance_stable.toString());
  //   console.log("writer_balance_unstable: ", writer_balance_unstable.toString());

  //   console.log("buyer_balance_stable: ", buyer_balance_stable.toString());
  //   console.log("buyer_balance_unstable: ", buyer_balance_unstable.toString());

  //   console.log("option_balance_stable: ", option_balance_stable.toString());
  //   console.log("option_balance_unstable: ", option_balance_unstable.toString());


  //   // 写期权
  //   // await unstable_tocken.transferFrom(writer.address,options.address,12);

  //   //await options.writeOption(1000,10,1700390808,12,{value:12});
  //   let tx = await options.writeOption(unstable_tocken.address, 1020,10,1700390808,12);
  //   await tx.wait();

  //   // console.log("1st option:", (await options.sk_options(0)).strike);
  //   // // console.log("2st option:", (await options.sk_options(1)).strike);

  //   // var options_balance = await unstable_tocken.balanceOf(options.address);
  //   // console.log("options_balance: ", options_balance.toString());

  //   // 取消期权
  //   // await options.cancelOption(0);
  //   // var writer_balance_unstable = await unstable_tocken.balanceOf(writer.address);
  //   // console.log("writer_balance_unstable: ", writer_balance_unstable.toString());
  //   // console.log("writer_balance_unstable: ", writer_balance_unstable.toString());
  //   // console.log("1st option:", (await options.sk_options(0)).canceled);
  //   // var writer_balance_unstable = await unstable_tocken.balanceOf(writer.address);
  //   // console.log("writer_balance_unstable: ", writer_balance_unstable.toString());

  //   // 买期权
  //   // await options.buyOption(0,{value:(await options.sk_options(0)).premium});
  //   // console.log("1st option:", (await options.sk_options(0)).buyer);
    
  //   // 确定两个账户公钥
  //   // writer:"0x251384a5d20e53D85e1FbbD9E87FfC3a23274885"
  //   // buyer: "0x4cC489692C8b7519EC72290e77E885828E94fb46"
  //   // 确定两个账户私钥
  //   // writer:"f76949de7c325fd8e82c153d0f4fd09941a4877217fa849adf7d42614afbccb8"
  //   // buyer: "e11c18e80ad4aafbfee1109e4dc9082a417902b725c1f22142ff1354bd226c9a"
  // });

  it("Testing transfer", async () => {
    const [writer,buyer] = await ethers.getSigners();

    const Unstable_tocken = await ethers.getContractFactory("SKCoin_Unstable_Asset");

    const SKCoin_stable_coin = await ethers.getContractFactory("SKCoin_stable_coin");

    const sKCoin_stable_coin = await SKCoin_stable_coin.deploy();
    await sKCoin_stable_coin.deployed();

    const unstable_tocken = await Unstable_tocken.deploy();
    await unstable_tocken.deployed();

    const balance = await unstable_tocken.balanceOf(writer.address);
    expect(balance).to.equal(100000);

    await unstable_tocken.transfer(buyer.address, 10000);
    const buyer_balance = await unstable_tocken.balanceOf(buyer.address);
    expect(buyer_balance).to.equal(10000);

    // get option contract
    const Options = await ethers.getContractFactory("Options");
    const options = await Options.deploy();
    await options.deployed();

    // approve unstable token
    await unstable_tocken.approve(options.address, 10000);
    await sKCoin_stable_coin.approve(options.address, 10000);

    // write option
    await options.writeOption(unstable_tocken.address, 2,10,1700390808,12);

    // 合约余额
    expect(await unstable_tocken.balanceOf(options.address)).to.equal(12);

    await options.writeOption(unstable_tocken.address, 2,10,1700390808,12);

    // 合约余额
    expect(await unstable_tocken.balanceOf(options.address)).to.equal(24);

    // 合约writer地址
    expect(await (await options.sk_options(0)).writer).to.equal(writer.address);
    
    // 合约金额
    expect(await (await options.sk_options(0)).balance).to.equal(12);

    // cancel option
    await options.cancelOption(unstable_tocken.address,0);
    expect(await (await options.sk_options(0)).canceled).to.equal(true);

    // buy option
    await options.buyOption(unstable_tocken.address,1);
    expect(await (await options.sk_options(1)).buyer).to.equal(writer.address);

    // exercise option
    expect(await (await options.sk_options(1)).exercised).to.equal(false);
    await options.exercise(sKCoin_stable_coin.address,unstable_tocken.address,1);
    expect(await (await options.sk_options(1)).exercised).to.equal(true);

    const returnedOptions = await options.get_all_options();
    expect(returnedOptions.length).to.equal(2);
  });
});