import { useState } from "react";
import "./styles.css";

interface ISellToken {
  sellTokens: (amount: number) => {};
}

const SellToken = ({ sellTokens }: ISellToken) => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="sellTokenContainer">
      <h1 className="sellTokenTitle">Sell NRDT</h1>
      <input
        className="sellTokenInput"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button className="buyBtn" onClick={() => sellTokens(amount)}>
        Sell NRDT
      </button>
    </div>
  );
};

export default SellToken;
