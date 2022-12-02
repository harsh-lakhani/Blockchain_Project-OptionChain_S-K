import React from 'react'
import { ethers } from "ethers"
import abi from "./abi.json"
import abi2 from "./abi2.json"
import { useParams } from "react-router-dom"

function Form(){
    const [amount, setAmount] = React.useState(0)
    const [premprice, setPremprice] = React.useState(0)
    const [strprice, setStrprice] = React.useState(0)
    const [ success, setSuccess ] = React.useState(true)
    // const [price, setPrice] = React.useState(0);
    // const optionAddress = "0xdB491786f7e1BDf8BA4a49089f9Fd580706505CF";
    // const optionAddress = "0x45e53883BCECFc41d5dBCb45a5b23183e90eD0e2";
    const optionAddress = "0x83C40d78Bc45447821170C825c32a9E763DF18eD";
    // const stableAddress = "0x5f4576A8Cf609c9104353eB75f67023C7488ceed";
    const unstableAddress = "0xC2283AA608b5347555EDd7dDA5DC7BEA95025636";
    const { option } = useParams()
    console.log("Option", option)

    const sellOption = async (e) => {
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(optionAddress, abi, signer)
        // const contract1 = new ethers.Contract(stableAddress, abi1, signer)
        const contract2 = new ethers.Contract(unstableAddress, abi2, signer)
        // let tx1 = await contract1.approve(optionAddress, 10000000);
        // await tx1.wait();
        let tx2 = await contract2.approve(optionAddress, 10000000);
        await tx2.wait();

        // write option1
        const tx3 = await contract.writeOption(unstableAddress,strprice,premprice,1700390808,amount,{
            gasLimit: 2100000
        });
        await tx3.wait()
        console.log(tx3)

        // // wirte option2
        // const tx4 = await contract.writeOption(unstableAddress,2,10,1700390808,12,{
        //     gasLimit: 2100000
        // });
        // await tx4.wait()
        // console.log(tx4)

        // // cnacel option1
        // const tx5 = await contract.cancelOption(unstableAddress,0,{
        //     gasLimit: 2100000
        // });
        // console.log(tx5)

        // // buy option2
        // const tx6 = await contract.buyOption(stableAddress,1,{
        //     gasLimit: 2100000
        // });
        // console.log(tx6)

        // // exercise option2
        // const tx7 = await contract.exercise(stableAddress,unstableAddress,1,{
        //     gasLimit: 2100000
        // });
        // console.log(tx7)

        const writer = await contract.get_option_writer(optionAddress,0)
        console.log(writer)

        setSuccess(true)
    };

    return (
        <div className='input-container'>
            <form>
            <div>
                <label>
                    Premium Price:
                    <input type="integer" name="premprice" onChange={(e) => setPremprice(parseInt(e.target.value))}/>
                </label>
            </div>
            <br>
            </br>
            <div>
                <label>
                    Strike Price: 
                    <input type="text" name="strprice" onChange={(e) => setStrprice(parseInt(e.target.value))}/>
                </label>
            </div>
            <br>
            </br>
            <div>
                <label>
                    Expiry Date: 
                    <input type="date" name="expdate" />
                </label>
            </div>
            <br>
            </br>
            <div>
                <label>
                    Amount:
                    <input type="text" name="amt" onChange={(e) => setAmount(parseInt(e.target.value))}/>
                </label>
            </div>
            <br>
            </br>
            <div className='btn-group'>
                <button className='btn' onClick={(e) => {sellOption(e)}}>Sell Option</button>
            </div>
            </form>
        </div>
    )
}

export default Form;