import React, { useState, useEffect } from "react";
import * as weatherCodes from "../weathercodes";
import { degree } from "../config";
import WIcon from "./WIcon";

const Weather = () => {
    const [weather, setWeather] = useState({
        coord: {
            lon: -77.17,
            lat: 38.88
        },
        weather: [
            {
                id: 721,
                main: "Haze",
                description: "haze",
                icon: "50d"
            }
        ],
        base: "stations",
        main: {
            temp: 46.24,
            feels_like: 39.88,
            temp_min: 42.8,
            temp_max: 48.99,
            pressure: 1022,
            humidity: 52
        },
        visibility: 2414,
        wind: {
            speed: 4.34,
            deg: 183
        },
        clouds: {
            all: 1
        },
        dt: 1577295068,
        sys: {
            type: 1,
            id: 3231,
            country: "US",
            sunrise: 1577276719,
            sunset: 1577310711
        },
        timezone: -18000,
        id: 4758390,
        name: "Falls Church",
        cod: 200
    });
    const [weatherFetched, setFetched] = useState(true);

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
        <div className="app-wrapper-element-wrapper-weather">
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
            <div
                className="app-wrapper-element-wrapper-weather-digit"
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
                {weather && weather.main && weather.main.temp
                    ? `${weather.main.temp} ${degree}F`
                    : null}
            </div>
        </div>
    );
};

export default Weather;
