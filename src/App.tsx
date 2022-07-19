import { useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import NRDTDEX from "./contracts/NRDTDEX.json";
import "./App.css";

import Modal from "./components/Modal";
import BuyToken from "./components/Modal/content/BuyToken";
import SellToken from "./components/Modal/content/SellToken";
import Processing from "./components/Modal/content/Processing";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3, setWeb3] = useState(new Web3());
  const contractAddress = "0x7A614d0A3d4de47c884225515274beda0C48c4b9";
  const contractInteraction = new web3.eth.Contract(
    NRDTDEX.abi as AbiItem[],
    contractAddress
  );
  const [account, setAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalContentIndex, setModalContentIndex] = useState(7);

  async function activate() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        checkAccount();
      } catch (err) {
        console.log("user did not add account...", err);
      }
    }
  }

  async function checkAccount() {
    let web3 = new Web3(window.ethereum);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  function isLoggedIn() {
    if (account.length < 1) {
      activate();
      return false;
    }
    return true;
  }

  function handleModal(modalIndex: number) {
    setModalContentIndex(modalIndex);
    setIsOpen(true);
  }

  async function buyTokens(amount: number) {
    if (isLoggedIn()) {
      try {
        setModalContentIndex(3);
        setIsOpen(true);
        let response = await contractInteraction.methods
          .buyTokens()
          .send({ from: account, value: amount });
        alert(response);
        console.log(response);
      } catch (err: any) {
        alert(err.message);
        console.log(err.message);
      }
      setIsOpen(false);
    } else {
      alert("Please connect your Metamask Wallet.");
    }
  }

  async function sellTokens(amount: number) {
    if (isLoggedIn()) {
      try {
        setModalContentIndex(3);
        setIsOpen(true);
        let response = await contractInteraction.methods
          .sellTokens()
          .send({ from: account, value: amount });
        alert(response);
        console.log(response);
      } catch (err: any) {
        alert(err.message);
        console.log(err.message);
      }
      setIsOpen(false);
    } else {
      alert("Please connect your Metamask Wallet.");
    }
  }

  function modalContent() {
    switch (modalContentIndex) {
      case 1:
        return <BuyToken buyTokens={buyTokens} />;
      case 2:
        return <SellToken sellTokens={sellTokens} />;
      case 3:
        return <Processing />;
      default:
        return null;
    }
  }

  return (
    <div className="appContainer">
      <h1 className="title">NRDT Decentralized Exchange</h1>
      {account ? null : (
        <button className="connectWalletBtn" onClick={activate}>
          Connect Wallet
        </button>
      )}
      {account ? (
        <div>
          <div></div>
          <div className="modalButtons">
            <button className="modalBtn" onClick={() => handleModal(1)}>
              Buy NRDT
            </button>
            <button className="modalBtn" onClick={() => handleModal(2)}>
              Sell NRDT
            </button>
          </div>
        </div>
      ) : null}

      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        renderProps={modalContent}
      />
    </div>
  );
}

export default App;
