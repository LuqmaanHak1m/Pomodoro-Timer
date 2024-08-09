import { useEffect, useState } from "react";

function Timer({ startMinutes, startSeconds, stop }) {
  const [minutes, setMinutes] = useState(startMinutes);
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    const time = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes !== 0) {
              return prevMinutes - 1;
            }
            return 0;
          });

          if (minutes === 0) {
            return 0;
          }

          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    if (stop) {
      clearInterval(time);
    }

    return () => clearInterval(time);
  }, [stop]);

  return (
    <>
      {minutes < 10 ? "0" + minutes : minutes}:
      {seconds < 10 ? "0" + seconds : seconds}
    </>
  );
}

export default Timer;
