import React, { useEffect, useState } from "react";
import DateTime from "./components/DateTime";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";
import Weather from "./components/Weather";
import "./styles/build/startpage.min.css";
// import { BookmarksProvider } from "./composition/BookmarksProvider";
import { BookmarkProvider } from "./contexts/BookmarkContext";

function App() {
    return (
        <div className="app">
            <div className="app-wrapper">
                <div className="app-wrapper-element">
                    <div className="app-wrapper-element-wrapper">
                        {/* <DateTime /> */}
                        <DateTime />
                        {/* Weather Information */}
                        <Weather />
                    </div>
                </div>
                <BookmarkProvider>
                    {/* DuckDuckGo! search field. */}
                    <Search placeholder="Search using DuckDuckGo!" />
                    {/* Bookmarks */}
                    <Bookmarks />
                </BookmarkProvider>
            </div>
        </div>
    );
}

export default App;
