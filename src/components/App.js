import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tab, setTab] = useState("BUY");

  return (
    <div className="container">
      <h1 className="title">NRD BlockChain Exchange</h1>
      <div className="tabsContainer">
        <button className="tabButton" onClick={() => setTab("BUY")}>
          Buy NRDTokens
        </button>
        <button className="tabButton" onClick={() => setTab("SELL")}>
          Sell NRDTokens
        </button>
      </div>
      {tab === "BUY" && <div> </div>}
      {tab === "BUY" ? (
        <button className="actionBtn" onClick={() => alert("NRD")}>
          Buy tokens
        </button>
      ) : (
        <button className="actionBtn" onClick={() => alert("NRD")}>
          Sell tokens
        </button>
      )}
    </div>
  );
};

export default App;
