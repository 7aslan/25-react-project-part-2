import { useEffect, useRef, useState } from "react";

function CountdownTimer({ initialTime, onTimeFinish }) {
  const [timer, setTimer] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const intervalReference = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalReference.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalReference.current);
            setIsRunning(false);

            if (onTimeFinish) {
              onTimeFinish();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalReference.current);
    }

    return () => {
      clearInterval(intervalReference.current);
    };
  }, [isRunning, onTimeFinish]);
  function handlePauseAndResume() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }
  function handleStart() {
    setIsRunning(true);
  }
  function handleReset() {
    clearInterval(intervalReference.current);
    setTimer(initialTime);
    setIsRunning(false);
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="timer">
      <p>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <div className="timer-buttons">
        <button onClick={handlePauseAndResume}>
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}

export default CountdownTimer;
