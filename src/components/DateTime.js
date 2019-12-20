import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [time, setTime] = useState("Loading ..");
  const [date, setDate] = useState("Loading ..");

  let _date = new Date();

  function calculateTime() {
    let time = _date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });

    return time;
  }

  function calculateDate() {
    let date = _date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return date;
  }

  useEffect(() => {
    setTimeout(() => {
      setTime(calculateTime());
      setDate(calculateDate());
    }, 1000);
  });

  return (
    <div className="app-wrapper-element">
      <div className="app-wrapper-element-time">{time}</div>
      <div className="app-wrapper-element-date">{date}</div>
    </div>
  );
};

export default DateTime;
