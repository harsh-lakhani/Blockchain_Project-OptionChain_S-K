// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./SKCoin.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Options{
    // 合约地址
    address payable contractAddr;

    // 生成器
    constructor() public {
        contractAddr = payable(address(this));
    }

    // 定义使用的stable coin(cMMD)
    SKCoin_stable_coin public sk_coin;

    // 定义使用的unstable coin(MMD)
    SKCoin_Unstable_Asset public sk_asset;

    // safemath
    using SafeMath for uint256;
    
    // MMD的价格
    uint sk_coinPrice;

    // option array
    option[] public sk_options;

    function get_all_options() public view returns(option[] memory) {
        // if sk_options' length is less than 20
        if (sk_options.length < 20) {
            option[] memory options = new option[](sk_options.length);
            // return the first few items until the sk_options' length
            for (uint i = 0; i < sk_options.length; i++) {
                options[i] = sk_options[i];
            }
            return options;
        } 

        // create a in memory array with fixed size 20
        option[] memory options = new option[](20);
        // copy first 20 items from sk_options to memory option array
        for (uint i = 0; i < 20; i++) {
            options[i] = sk_options[i];
        }

        // return the memory options
        return options;
    }

    
    // option contract address

    struct option {
        
        // strike price
        uint strike; 

        // Fee in contract token that option writer charges
        uint premium;

        //Unix timestamp of expiration time
        uint expiry;

        //Amount of tokens the option contract is for
        uint amount; 

        // flag: Has option been exercised
        // false: not exercised; true: exercised
        bool exercised; 

        // flag: Has option been canceled
        // false: not canceled; true: canceled
        bool canceled;

        // options' addresses
        uint id; //Unique option_address of option, also array index

        // cost
        uint latestCost;

        // Issuer of option
        address payable writer; 

        // Buyer of option
        address payable buyer;

        // balance 
        uint balance;
    }

    // 返回MMD的价格
    function get_sk_price(address addr) public view returns (uint) {
        //return IUniswap(addr).getLatestPrice();
        return 1200;
    }
    // function comparetime(uint time)  public view returns (uint) {
    //     //return IUniswap(addr).getLatestPrice();
    //     if (time > block.timestamp){
    //         return 1000;
    //     } else{
    //         return 1;
    //     }
    // }

    // 返回期权的strike
    function get_option_strike(address addr, uint id) public view returns (uint) {
        return sk_options[id].strike;
    }

    // 返回期权的premium
    function get_option_premium(address addr, uint id) public view returns (uint) {
        return sk_options[id].premium;
    }

    // 返回期权的expiry
    function get_option_expiry(address addr, uint id) public view returns (uint) {
        return sk_options[id].expiry;
    }

    // 返回期权的amount
    function get_option_amount(address addr, uint id) public view returns (uint) {
        return sk_options[id].amount;
    }

    // 返回期权的exercised
    function get_option_exercised(address addr, uint id) public view returns (bool) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].exercised;
    }

    // 返回期权的canceled
    function get_option_canceled(address addr, uint id) public view returns (bool) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].canceled;
    }

    // 返回期权的id
    function get_option_id(address addr, uint id) public view returns (uint) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].id;
    }

    // 返回期权的latestCost
    function get_option_latestCost(address addr, uint id) public view returns (uint) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].latestCost;
    }

    // 返回期权的writer
    function get_option_writer(address addr, uint id) public view returns (address payable) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].writer;
    }

    // 返回期权的buyer
    function get_option_buyer(address addr, uint id) public view returns (address payable) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].buyer;
    }

    // 返回期权的balance
    function get_option_balance(address addr, uint id) public view returns (uint) {
        //return IUniswap(addr).getLatestPrice();
        return sk_options[id].balance;
    }



    // write covered-call-option 
    function writeOption(address cont, uint strike, uint premium, uint expiry, uint tknAmt) public payable returns (bool) {
        // //get underlying asset's price
        uint sk_coin_price = get_sk_price(address(this));

        // // check balance
        // sk_asset.transferFrom(msg.sender,contractAddr,tknAmt);
        // sk_asset.transfer(contractAddr,tknAmt);

        // transfer unstablecoin fron writer to contract
        bool success =  IERC20(cont).transferFrom(msg.sender, address(this), tknAmt);
        console.log("transfer success: ", success);
        require(success,"Incorrect amount of MMD supplied");

        // check blance
        uint256 balance = IERC20(cont).balanceOf(contractAddr);
        console.log("Contract balance:", balance);         
        
        // calculate the cost to exercise the option
        uint latestCost = strike.mul(tknAmt).div(sk_coin_price.mul(10**10));
        
        // create option
        sk_options.push(option(strike, premium, expiry, tknAmt, false, false, sk_options.length, latestCost, payable(msg.sender), payable(address(0)),balance));
    }

    // cancel option 
    function cancelOption(address cont, uint id) public payable {

        // only owner has the right to cancel option
        require(msg.sender == sk_options[id].writer, "You do not write this option"); 

        // cannot be canceled already
        require(!sk_options[id].canceled, "This option cannot be canceled already");
        
        // cannot be bought already
        require(sk_options[id].buyer == address(0), "This option cannot be bought already");

        // do transaction
        uint256 balance = IERC20(cont).balanceOf(contractAddr);
        console.log("Contract balance123123:", balance);
        require(balance>=sk_options[id].amount,"Insufficient balance");
        IERC20(cont).transfer(msg.sender, sk_options[id].amount);

        // change status
        sk_options[id].canceled = true;
    }

    // buy option
    function buyOption(address cont, uint id) public payable {

        // cannot be canceled already
        require(!sk_options[id].canceled, "This option cannot be canceled already");
        
        // cannot be bought already
        require(sk_options[id].buyer == address(0), "This option cannot be bought already");

        // cannot be expired already
        require(sk_options[id].expiry > block.timestamp, "This option cannot be expired already");
        
        //Transfer premium payment from buyer to writer
        // require(sk_coin.transferFrom(msg.sender, sk_options[id].writer, sk_options[id].premium), "Incorrect amount of cMMD sent for premium");
        // require(msg.value==sk_options[id].premium, "Incorrect amount of MMD supplied");
        bool success = IERC20(cont).transferFrom(msg.sender, address(this), sk_options[id].premium);
        
        console.log("transfer success: ", success);
        require(success, "Incorrect amount of cMMD supplied");

        // recored buyer address
        sk_options[id].buyer = payable(msg.sender);
    }

    // exercise option
    function exercise(address cont_stable, address cont_unstable, uint id) public payable {
        // get underlying asset's price
        sk_coinPrice = get_sk_price(address(this));

        // you must own the option contract
        require(sk_options[id].buyer == msg.sender, "You do not own this option");

        // cannot be exercised already
        require(!sk_options[id].exercised, "Option cannot be exercised already");

        // cannot be canceled already
        require(!sk_options[id].canceled, "This option cannot be canceled already");

        // cannot be expired already
        require(sk_options[id].expiry > block.timestamp, "Option cannot be expired already");

        // uint exerciseVal = sk_options[id].strike*sk_options[id].amount;
        // uint equivLink = exerciseVal.div(sk_coinPrice.mul(10**10));

        // buyer pay strike fee
        bool success =  IERC20(cont_stable).transferFrom(msg.sender, address(this), sk_options[id].strike*sk_options[id].amount);
        console.log("transfer success: ", success);
        require(success,"Incorrect amount of MMD supplied");

        // transfer unstablecoin fron contract to buyer
        IERC20(cont_unstable).transfer(msg.sender, sk_options[id].amount);

        // change status
        sk_options[id].exercised = true;        
    }

    // retrieve option when it is expired
    function retrieveExpiredFunds(address cont,uint id) public payable {
        
        // you must own the option contract
        require(msg.sender == sk_options[id].writer, "You did not write this option");

        // cannot be canceled already
        require(!sk_options[id].canceled, "This option cannot be canceled already");

        // cannot be exercised already
        require(!sk_options[id].exercised, "Option cannot be exercised already");

        // must be expired already
        require(!(sk_options[id].expiry > block.timestamp), "Option cannot be expired already");

        //Conditions are met, proceed to payouts

        // get refund
        uint256 balance = IERC20(cont).balanceOf(contractAddr);
        console.log("Contract balance123123:", balance);
        require(balance>=sk_options[id].amount,"Insufficient balance");
        IERC20(cont).transfer(msg.sender, sk_options[id].amount);
        
        // change status
        sk_options[id].canceled = true;
    }
}