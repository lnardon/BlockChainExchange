import { useState } from "react";
import "./styles.css";

interface ISellToken {
  sellTokens: (amount: number) => {};
}

const SellToken = ({ sellTokens }: ISellToken) => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="modalContainer">
      <h1 className="modalTitle">Sell NRDT</h1>
      <div className="modalAmountContainer">
        <button
          className="modalAmountBtn"
          onClick={() => setAmount(amount - 1)}
        >
          -
        </button>
        <div className="modalAmountLabel">{amount}</div>
        <button
          className="modalAmountBtn"
          onClick={() => setAmount(amount + 1)}
        >
          +
        </button>
      </div>

      <button className="modalBtn" onClick={() => sellTokens(amount)}>
        Buy NRDT
      </button>
    </div>
  );
};

export default SellToken;
