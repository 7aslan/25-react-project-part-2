import "./App.css";
import BMICalculator from "./components/bmi-calculator";
import CountdownTimerTest from "./components/countdown-timer/test";
import CurrencyConverter from "./components/currency-converter";
import DigitalClock from "./components/digital-clock";
import FilterProducts from "./components/filter-products";
import MusicPlayer from "./components/music-player";
import PaginationTest from "./components/pagination/test";
import ProgressBar from "./components/progress-bar";
import RandomQuoteGenerator from "./components/random-quote-generator";
import StepProgressBarTest from "./components/step-progress-bar/test";
import TipCalculator from "./components/tip-calculator";
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
      <FilterProducts />
      <TipCalculator />
      <MusicPlayer />
      <ProgressBar />
      <BMICalculator />
    </div>
  );
}

export default App;
