import Loader from "./loader.svg";
import "./styles.css";

const Processing = () => {
  return (
    <div className="processingContainer">
      <h1 className="processingTitle">Processing transaction</h1>
      <img className="loader" src={Loader} alt="loader" />
    </div>
  );
};

export default Processing;
