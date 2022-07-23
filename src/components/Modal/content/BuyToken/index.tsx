import { useState } from "react";
import "./styles.css";

interface IBuyToken {
  buyTokens: (amount: number) => {};
}

const BuyToken = ({ buyTokens }: IBuyToken) => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="buyTokenContainer">
      <h1 className="buyTokenTitle">Buy NRDT</h1>
      <input
        className="buyTokenInput"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button className="buyBtn" onClick={() => buyTokens(amount)}>
        Buy NRDT
      </button>
    </div>
  );
};

export default BuyToken;
