import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tab, setTab] = useState(false);

  return (
    <div className="container">
      <h1 className="title">NRD BlockChain Exchange</h1>
      <div className="tabsContainer">
        <button className="tabButton" onClick={() => setTab(!tab)}>
          Buy NRDTokens
        </button>
        <button className="tabButton" onClick={() => setTab(!tab)}>
          Sell NRDTokens
        </button>
      </div>
    </div>
  );
};

export default App;
