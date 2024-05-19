import { useState } from "react";
import "./tip-calculator.css";

function TipCalculator() {
  const [billAmount, setBillAmount] = useState(null);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [splitCount, settSplitCount] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function handleCalculateTip() {
    if (
      !billAmount ||
      billAmount <= 0 ||
      !tipPercentage ||
      tipPercentage <= 0
    ) {
      setErrorMsg(
        "Please enter valid values for bill amont and tip percentage!"
      );
      return;
    }
    const bill = parseFloat(billAmount);
    const tip = (bill * tipPercentage) / 100;
    const totalAmount = bill + tip;
    const tipAmountPerPerson = tip / splitCount;
    const totalAmountPerPerson = totalAmount / splitCount;

    setTipAmount({
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipAmountPerPerson.toFixed(2),
      totalPerPerson: totalAmountPerPerson.toFixed(2),
    });
    setErrorMsg("");
  }

  return (
    <div className="tip-calculator">
      <h1>Tip Calculator</h1>
      <div className="input-container">
        <label>Bill Amount:</label>
        <input
          onChange={(e) => setBillAmount(e.target.value)}
          value={billAmount}
          type="number"
        />
      </div>
      <div className="input-container">
        <label>Tip Percentage:</label>
        <input
          onChange={(e) => setTipPercentage(e.target.value)}
          value={tipPercentage}
          type="number"
        />
      </div>
      <div className="input-container">
        <label>Number of People:</label>
        <input
          onChange={(e) => settSplitCount(e.target.value)}
          value={splitCount}
          type="number"
        />
      </div>
      <button onClick={handleCalculateTip}>Calculate Tip</button>
      {errorMsg ? <p className="error-message">{errorMsg}</p> : null}
      {tipAmount ? (
        <div className="tip-result-container">
          <p>Total Amount:{tipAmount.totalAmount}</p>
          <p>Tip Per Person:{tipAmount.tipPerPerson}</p>
          <p>Total Amount Per Person:{tipAmount.totalPerPerson}</p>
        </div>
      ) : null}
    </div>
  );
}

export default TipCalculator;
