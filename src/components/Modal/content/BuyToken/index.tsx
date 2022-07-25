import { useState } from "react";
import "./styles.css";

import ArrowIcon from "../../../../assets/arrow.svg";

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
          onClick={() => {
            if (amount > 0) setAmount(amount - 1);
          }}
        >
          <img className="modalArrow down" src={ArrowIcon} alt="Arrow down" />
        </button>
        <div className="modalAmountLabel">{amount}</div>
        <button
          className="modalAmountBtn"
          onClick={() => setAmount(amount + 1)}
        >
          <img className="modalArrow" src={ArrowIcon} alt="Arrow up" />
        </button>
      </div>

      <button className="modalBtn" onClick={() => buyTokens(amount)}>
        Buy
      </button>
    </div>
  );
};

export default BuyToken;
