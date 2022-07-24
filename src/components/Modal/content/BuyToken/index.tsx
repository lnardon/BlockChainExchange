import { useState } from "react";
import "./styles.css";

interface IBuyToken {
  buyTokens: (amount: number) => {};
}

const BuyToken = ({ buyTokens }: IBuyToken) => {
  const [amount, setAmount] = useState(1);

  return (
    <div className="modalContainer">
      <h1 className="modalTitle">Buy NRDT</h1>
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

      <button className="modalBtn" onClick={() => buyTokens(amount)}>
        Buy NRDT
      </button>
    </div>
  );
};

export default BuyToken;
