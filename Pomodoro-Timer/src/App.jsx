import { useEffect, useState } from "react";
import Timer from "./timer";

function App() {
  const [startminutes, setStartMinutes] = useState(20);
  const [startseconds, setStartSeconds] = useState(0);

  const [stopTimer, setStopTimer] = useState(false);

  function handleStop() {
    setStopTimer(true);
  }

  function handleStart() {
    setStopTimer(false);
  }

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <h2>Work</h2>
      <p id="WorkTimer">
        <Timer
          startMinutes={startminutes}
          startSeconds={startseconds}
          stop={stopTimer}
        />
      </p>
      <h2>Break</h2>
      <p id="BreakTimer">
        <Timer startMinutes={1} startSeconds={0} />
      </p>
      <button>Skip</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleStart}>Start</button>
    </>
  );
}

export default App;
