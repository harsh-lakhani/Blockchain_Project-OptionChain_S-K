import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Hero.css";
import { ethers } from "ethers";
import abi from "./abi.json";
import abi1 from "./abi1.json"
import abi2 from "./abi2.json";

function Buyer() {
  const [selectedOption, setSelectedOption] = React.useState();
  const [userAddress, setUserAddress] = React.useState();
  const [options, setOptions] = React.useState([]);

  // const optionAddress = "0x45e53883BCECFc41d5dBCb45a5b23183e90eD0e2";
  const optionAddress = "0x83C40d78Bc45447821170C825c32a9E763DF18eD";
  const stableAddress = "0x5f4576A8Cf609c9104353eB75f67023C7488ceed";
  const unstableAddress = "0xC2283AA608b5347555EDd7dDA5DC7BEA95025636";

  const buyOption = async () => {
    // buy option2
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(optionAddress, abi, signer);
    const contract1 = new ethers.Contract(stableAddress, abi1, signer);
    const contract2 = new ethers.Contract(unstableAddress, abi2, signer);

    let tx1 = await contract1.approve(optionAddress, 10000000);
    await tx1.wait();

    let tx2 = await contract2.approve(optionAddress, 10000000);
    await tx2.wait();

    const tx6 = await contract.buyOption(stableAddress, selectedOption.id, {
      gasLimit: 2100000,
    });
    await tx6.wait();
    console.log("Option is purchased");
  };

  const exerciseOption = async () => {
    // exercise option2
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(optionAddress, abi, signer);
    const tx6 = await contract.exercise(stableAddress, unstableAddress,selectedOption.id, {
      gasLimit: 2100000,
    });
    console.log(tx6);
  };

//   const cancelOption = async () => {
//     // exercise option2
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(optionAddress, abi, signer);
//     const tx6 = await contract.cancelOption(stableAddress, selectedOption, {
//       gasLimit: 2100000,
//     });
//     console.log(tx6);
//   };

  const listOption = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setUserAddress(await signer.getAddress());
    const contract = new ethers.Contract(optionAddress, abi, signer);
    const options = await contract.get_all_options();
    console.log("options", options);
    return options;
  };

  React.useEffect(() => {
    listOption().then((options) => {
      setOptions(options);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="hero">
        <br></br>
        <h2>
          Buy<span className="primary">Exercise</span>Cancel <span className="primary">Options</span>
        </h2>
        <div className="container">
          <div className="left" style={{ border: "2px solid black" }}>
            <h3>Available Options</h3>
            {options.map((option) => (
              <div
                className="left"
                style={{ border: "1px solid black" }}
                onClick={() => setSelectedOption(option)}
              >
                <div>ID: {parseInt(option.id._hex, 16)}</div>
                <div>Strike: {parseInt(option.strike._hex, 16)}</div>
                <div>Premium: {parseInt(option.premium._hex, 16)}</div>
                <div>Amount: {parseInt(option.amount._hex, 16)}</div>
                <div>Expiry Date: 1700390808</div>
                {/* <div>Canceled: {option.canceled ? "true" : "false"}</div> */}
                <div>Exercised: {option.exercised ? "true" : "false"}</div>
                <div>Buyer: {option.buyer}</div>
                <div>Writer: {option.writer}</div>
              </div>
            ))}
          </div>
          <div className="right">
            <div className="input-container"></div>
            <div className="btn-group">
            {selectedOption && selectedOption.buyer.startsWith("0x00") && (
              <button
                className="btn"
                onClick={() => {
                  let confirmed = window.confirm(
                    "Buying Option: " + selectedOption
                  );
                  if (confirmed) {
                    buyOption();
                  }
                }}
              >
                Buy Option: {selectedOption && parseInt(selectedOption.id._hex)}
              </button>
            )}
            </div>
            <div className="input-container"></div>
            <div className="btn-group">
              {selectedOption && selectedOption.buyer === userAddress && selectedOption.exercised === false && (
                <button
                  className="btn"
                  onClick={() => {
                    let confirmed = window.confirm(
                      "Exercising Option: " + selectedOption
                    );
                    if (confirmed) {
                      exerciseOption();
                    }
                  }}
                >
                  Exercise Option: {selectedOption && parseInt(selectedOption.id._hex)}
                </button>
              )}
            </div>
            <div className="input-container"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Buyer;
