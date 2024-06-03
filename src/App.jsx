import "./App.css";
import BMICalculator from "./components/bmi-calculator";
import ButtonRippleEffect from "./components/button-ripple-effect";
import CountdownTimerTest from "./components/countdown-timer/test";
import CurrencyConverter from "./components/currency-converter";
import DebounceApiCall from "./components/debounce";
import DigitalClock from "./components/digital-clock";
import DragAndDropFeature from "./components/drag-and-drop";
import FileUpload from "./components/file-upload";
import FilterProducts from "./components/filter-products";
import FirebaseAuth from "./components/firebase-auth";
import FirebaseTodo from "./components/firebase-todo";
import FormValidation from "./components/form-validation";
import MusicPlayer from "./components/music-player";
import NestedComments from "./components/nested-comments";
import PaginationTest from "./components/pagination/test";
import PdfViewer from "./components/pdf-viewer";
import ProgressBar from "./components/progress-bar";
import Quiz from "./components/quiz-app";
import RandomQuoteGenerator from "./components/random-quote-generator";
import SortData from "./components/sort-data";
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
      <ButtonRippleEffect />
      <DragAndDropFeature />
      <FormValidation />
      <FileUpload />
      <Quiz />
      <NestedComments />
      <PdfViewer />
      <FirebaseTodo
        authInfo={{
          user: "deneme",
          email: "deneme@deneme.com",
        }}
      />
      <FirebaseAuth />
      <DebounceApiCall />
      <SortData />
    </div>
  );
}

export default App;
