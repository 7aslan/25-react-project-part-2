import "./App.css";
import CountdownTimerTest from "./components/countdown-timer/test";
import CurrencyConverter from "./components/currency-converter";
import DigitalClock from "./components/digital-clock";
import PaginationTest from "./components/pagination/test";
import RandomQuoteGenerator from "./components/random-quote-generator";
import StepProgressBarTest from "./components/step-progress-bar/test";
import TooltipTest from "./components/tooltip/test";

function App() {
  return (
    <div className="App">
      <h1 className="title">25 React JS Projects</h1>
      <PaginationTest />
      <DigitalClock />
      <CountdownTimerTest />
      <StepProgressBarTest />
      <RandomQuoteGenerator />
      <TooltipTest />
      <CurrencyConverter />
    </div>
  );
}

export default App;
