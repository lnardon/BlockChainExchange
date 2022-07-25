import "./styles.css";
import NRDTLogo from "../../assets/NRDTLogo.png";
import EthLogo from "../../assets/EthLogo.png";

const ConversionRate: any = () => {
  return (
    <div className="conversionContainer">
      <h1 className="conversionTitle">Conversion Rate</h1>
      <div className="conversionDiv">
        <div className="conversionCoin">
          <img className="conversionIcon" src={NRDTLogo} alt="" />
          <h2 className="conversionLabel">1</h2>
        </div>
        <div className="conversionSign">=</div>
        <div className="conversionCoin">
          <img className="conversionIcon" src={EthLogo} alt="" />
          <h2 className="conversionLabel">0.01</h2>
        </div>
      </div>
    </div>
  );
};

export default ConversionRate;
