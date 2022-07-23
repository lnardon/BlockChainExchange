import { useState, useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import NRDToken from "./contracts/NRDToken.json";
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
  const contractAddress = "0xf78B6cC281A3856de0CDbFe3Ddfe992CC8ec6a73";
  const nrdtAddress = "0xc4afF16D64e2508fc7338708BB31466154947596";
  const contractInteraction = new web3.eth.Contract(
    NRDTDEX.abi as AbiItem[],
    contractAddress
  );
  const tokenInteraction = new web3.eth.Contract(
    NRDToken.abi as AbiItem[],
    nrdtAddress
  );
  const [account, setAccount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const [nrdtBalance, setNrdtBalance] = useState("");
  const [modalContentIndex, setModalContentIndex] = useState(7);

  useEffect(() => {
    if (account) {
      (async () => {
        const response = await tokenInteraction.methods
          .balanceOf(account)
          .call();
        setNrdtBalance(response);
      })();
    }
  }, [account, tokenInteraction.methods]);

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
    const balance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(web3.utils.fromWei(balance));
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
          .buyTokens(amount)
          .send({ from: account, value: amount * 10000000000000000 });
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
          .sellTokens(amount)
          .send({ from: account, value: 0 });
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
      {ethBalance && (
        <h3 style={{ color: "white" }}>
          Ethereum Balance: {ethBalance.slice(0, 7)}
        </h3>
      )}
      {nrdtBalance && (
        <h3 style={{ color: "white" }}>NRDT Balance: {nrdtBalance}</h3>
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
