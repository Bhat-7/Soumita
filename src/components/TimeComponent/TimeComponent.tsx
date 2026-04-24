import "./TimeComponent.css";
import { useState, useEffect } from "react";

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="time-wrapper px-2">{currentTime}</div>;
};

export default TimeComponent;
