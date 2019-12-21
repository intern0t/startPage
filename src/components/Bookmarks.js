import React, { useState, useEffect } from "react";
import { Plus, X } from "react-feather";
// import { google_favicon } from "../config";
// import { Plus } from "react-feather";

// https://favicongrabber.com/service-api-reference

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([
        {
            name: "Open Weather Map",
            url: `https://openweathermap.org`,
            logo:
                "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png"
        },
        {
            name: "Reddit",
            url: `https://openweathermap.org`,
            logo:
                "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
        },
        {
            name: "Open Weather Map",
            url: `https://openweathermap.org`,
            logo:
                "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png"
        },
        {
            name: "Open Weather Map",
            url: `https://openweathermap.org`,
            logo:
                "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png"
        },
        {
            name: "Open Weather Map",
            url: `https://openweathermap.org`,
            logo:
                "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png"
        },
        {
            name: "Open Weather Map",
            url: `https://openweathermap.org`,
            logo:
                "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png"
        }
    ]);

    return (
        <div className="app-wrapper-element">
            <div className="bookmarks app-wrapper-element-inline">
                {bookmarks.map(bookmark => (
                    <Bookmark key={bookmark.name} bookmark={bookmark} />
                ))}

                {bookmarks.length < 8 ? <NewBookmark /> : null}
            </div>
        </div>
    );
};

const NewBookmark = () => {
    return (
        <a
            className="bookmark new-bookmark"
            href="#"
            title="Add a new bookmark."
        >
            <Plus size={30} />
        </a>
    );
};

const Bookmark = ({ bookmark }) => {
    const [removeVisible, setremoveVisible] = useState(false);

    return (
        <a
            className="bookmark"
            href={bookmark.url}
            title={bookmark.name}
            onMouseOver={() => setremoveVisible(!removeVisible)}
            onMouseOut={() => setremoveVisible(!removeVisible)}
        >
            <img
                height="40px"
                width="40px"
                src={bookmark.logo}
                alt={`${bookmark.name}'s icon.`}
            />
            <span>{bookmark.name}</span>
            {removeVisible ? (
                <div
                    className="bookmark-remove"
                    onMouseOut={e => e.preventDefault()}
                    title="Remove"
                >
                    <X size={10} color={"#FFF"} />
                </div>
            ) : null}
        </a>
    );
};

export default Bookmarks;
