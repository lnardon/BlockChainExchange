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
      <button onClick={() => buyTokens(amount)}>Buy 1 NRDT</button>
    </div>
  );
};

export default BuyToken;
