import React from "react";
import "./styles/build/startpage.min.css";
import DateTime from "./components/DateTime";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";
// import Weather from "./components/Weather";

function App() {
    return (
        <div className="app">
            <div className="app-wrapper">
                {/* Date & Time */}
                <DateTime />
                {/* DuckDuckGo! search field. */}
                <Search placeholder="Search using DuckDuckGo!" />
                {/* Weather Information */}
                {/* <Weather /> */}
                {/* Bookmarks */}
                <Bookmarks />
            </div>
        </div>
    );
}

export default App;
