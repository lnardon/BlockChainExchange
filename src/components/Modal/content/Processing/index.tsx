import Loader from "./loader.svg";
import "./styles.css";

const Processing = () => {
  return (
    <div className="processingContainer">
      <h1 className="processingTitle">Processing transaction</h1>
      <img className="loader" src={Loader} alt="loader" />
      <h2 className="waitMessage">
        Confirm the transaction on your metamask wallet and leave this window
        open to get notified when the transaction is confirmed by the
        blockchain.
      </h2>
    </div>
  );
};

export default Processing;
