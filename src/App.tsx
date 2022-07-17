import { useState } from "react";
import Web3 from "web3";
import "./App.css";

import Modal from "./components/Modal";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3, setWeb3] = useState(new Web3());
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

  function modalContent() {
    switch (modalContentIndex) {
      case 1:
        return <h1>Buy NRDT</h1>;
      case 2:
        return <h1>Sell NRDT</h1>;
      default:
        return <h1>Zero</h1>;
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
      {account}

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
