import Web3 from "web3";
import "./styles.css";

interface IBuyToken {
  web3: Web3;
}

const BuyToken = ({ web3 }: IBuyToken) => {
  function buyTokens() {
    console.log(web3.version);
  }

  return (
    <div className="buyTokenContainer">
      <h1 className="buyTokenTitle">Buy NRDT</h1>
      <button onClick={buyTokens}>CLick here</button>
    </div>
  );
};

export default BuyToken;
