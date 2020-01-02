import React, { useState, useEffect } from "react";
import * as weatherCodes from "../weathercodes";
import { degree } from "../config";
import WIcon from "./WIcon";

const Weather = () => {
    const [weather, setWeather] = useState("");
    const [weatherFetched, setFetched] = useState(false);

    const fetchWeather = () => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?&units=imperial&id=4758390&appid=8ff34902953bc9c9a8918ab0f0bb4205"
        )
            .then(res => res.json())
            .then(res => {
                setWeather(res);
                setFetched(true);
            });
    };

    useEffect(() => {
        let interval = null;

        if (!weatherFetched) {
            fetchWeather();
        } else {
            interval = setInterval(() => {
                fetchWeather();
            }, 1000 * 60);
        }
        return () => {
            clearInterval(interval);
        };
    }, [weatherFetched]);

    return (
        <div
            className="app-wrapper-element-wrapper-weather"
            title={
                weather &&
                weather.weather &&
                weather.weather[0] &&
                weather.weather[0].description
                    ? weather.weather[0].description.replace(/^\w/, c =>
                          c.toUpperCase()
                      )
                    : "Weather Information."
            }
        >
            <div className="app-wrapper-element-wrapper-weather-icon">
                {weather &&
                weather.weather &&
                weather.weather[0] &&
                weather.weather[0].icon &&
                weather.weather[0].id ? (
                    weather.weather[0].icon.indexOf("d") > 0 ? (
                        <WIcon
                            name={
                                weatherCodes[
                                    `wi-owm-day-${[weather.weather[0].id]}`
                                ]
                            }
                        />
                    ) : (
                        <WIcon
                            name={
                                weatherCodes[
                                    `wi-owm-night-${[weather.weather[0].id]}`
                                ]
                            }
                        />
                    )
                ) : null}
            </div>
            <div className="app-wrapper-element-wrapper-weather-digit">
                {weather && weather.main && weather.main.temp
                    ? `${weather.main.temp} ${degree}F`
                    : null}
            </div>
        </div>
    );
};

export default Weather;
