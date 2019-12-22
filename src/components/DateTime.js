import React, { useState, useEffect } from "react";
// import { name_24hours, prefix, set_24hours } from "../config";
import Weather from "./Weather";

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
            month: "long",
            day: "numeric",
            year: "numeric",
            weekday: "long"
        });
        return date;
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setDate(calculateDate());
            setTime(calculateTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <div className="app-wrapper-element">
            <div className="app-wrapper-element-wrapper">
                <div className="app-wrapper-element-wrapper-datetime">
                    <div className="app-wrapper-element-wrapper-datetime-time">
                        {time === "Loading .." ? time : time.substr(0, 5)}
                    </div>
                    <div className="app-wrapper-element-wrapper-datetime-date">
                        {date}
                    </div>
                </div>
                <Weather />
            </div>
        </div>
    );
};

export default DateTime;
