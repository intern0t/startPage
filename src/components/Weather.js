import React, { useState, useEffect } from "react";
import * as weatherCodes from "../weathercodes";

const Weather = () => {
    const [weather, setWeather] = useState({});
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
            console.log("Weather information fetched? " + weatherFetched);
            clearInterval(interval);
        };
    }, [weatherFetched]);

    return (
        <div className="app-wrapper-element">
            <div className="app-wrapper-element-inline">
                {weatherFetched && weather && weather.weather !== null ? (
                    <div className="app-wrapper-element-inline-weather">
                        <div className="app-wrapper-element-inline-weather-box">
                            {weather.main && weather.main.temp_min
                                ? weather.main.temp_min
                                : null}
                        </div>
                        <div className="app-wrapper-element-inline-weather-box">
                            {weather.weather && weather.weather[0] ? (
                                weather.weather[0].icon.indexOf("d") > 0 ? (
                                    <img
                                        src={require(
                                            `../misc/weather_icons/wi-${
                                                weatherCodes[
                                                    `wi-owm-day-${[
                                                        weather.weather[0].id
                                                    ]}`
                                                ]
                                            }.svg`
                                        )}
                                    />
                                ) : (
                                    "night"
                                )
                            ) : null}
                            {weather.main && weather.main.temp
                                ? weather.main.temp
                                : null}
                        </div>
                        <div className="app-wrapper-element-inline-weather-box">
                            {weather.main && weather.main.temp_max
                                ? weather.main.temp_max
                                : null}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Weather;
