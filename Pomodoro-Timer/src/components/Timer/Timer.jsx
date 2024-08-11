import { useEffect, useState } from "react";
import WorkInput from "../WorkInput/WorkInput";
import BreakInput from "../BreakInput/BreakInput";

import { Button, Alert, Container, Row, Col } from "reactstrap";

function Timer() {
  const [workTime, setWorkTime] = useState(1 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorkSession) {
        setTimeLeft(breakTime);
      } else {
        setTimeLeft(workTime);
      }
      setIsWorkSession(!isWorkSession);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkSession]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secondsLeft
      .toString()
      .padStart(2, "0")}`;
  }

  function handleStartStop() {
    setIsRunning(!isRunning);
  }

  function handleReset() {
    setIsRunning(false);
    setTimeLeft(workTime);
    setIsWorkSession(true);
  }

  function handleSkip() {
    setTimeLeft(0);
  }

  function changeWorkTime(time) {
    setWorkTime(time * 60);

    if (isWorkSession) {
      setTimeLeft(time * 60);
    }
  }

  function changeBreakTime(time) {
    setBreakTime(time * 60);

    if (!isWorkSession) {
      setTimeLeft(time * 60);
    }
  }

  return (
    <div className="p-2">
      <Row className="pb-2 align-items-center">
        <Col className="text-center ">
          <h1>{isWorkSession ? "Work" : "Break"} Session</h1>
          <div
            style={{ fontSize: "48px" }}
            className="bg-dark text-light rounded  w-50 m-auto mt-4"
          >
            {formatTime(timeLeft)}
          </div>

          <Col className="mt-3 py-2 pe-2 ps-0 d-flex justify-content-evenly ">
            <Button onClick={handleStartStop}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleSkip}>Skip</Button>
          </Col>
        </Col>

        <Col className=" ">
          <Row className="mb-4">
            <h3>Current Work Time: {formatTime(workTime)}</h3>
            <h3>Current Break Time: {formatTime(breakTime)}</h3>
          </Row>

          <Row>
            <WorkInput onSubmit={changeWorkTime} />
            <BreakInput onSubmit={changeBreakTime} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Timer;
