import React, { useState, useEffect } from "react";
import { Plus, X } from "react-feather";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

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
            name: "StackOverflow",
            url: `https://openweathermap.org`,
            logo:
                "https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png"
        },
        {
            name: "Github",
            url: `https://github.com`,
            logo: "https://github.githubassets.com/apple-touch-icon-60x60.png"
        },
        {
            name: "Reddit",
            url: `https://openweathermap.org`,
            logo:
                "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
        },
        {
            name: "StackOverflow",
            url: `https://openweathermap.org`,
            logo:
                "https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png"
        },
        {
            name: "Github",
            url: `https://github.com`,
            logo: "https://github.githubassets.com/apple-touch-icon-60x60.png"
        },
        {
            name: "Reddit",
            url: `https://openweathermap.org`,
            logo:
                "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
        },
        {
            name: "StackOverflow",
            url: `https://openweathermap.org`,
            logo:
                "https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png"
        },
        {
            name: "Github",
            url: `https://github.com`,
            logo: "https://github.githubassets.com/apple-touch-icon-60x60.png"
        }
    ]);

    return (
        <div className="app-wrapper-element">
            <div className="bookmarks app-wrapper-element-inline">
                <SimpleBar style={{ maxHeight: "220px", width: "100%" }}>
                    {bookmarks.map(bookmark => (
                        <Bookmark key={bookmark.name} bookmark={bookmark} />
                    ))}
                </SimpleBar>
            </div>
            <div className="bookmarks app-wrapper-element-inline">
                <NewBookmark />
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
            <span>Add a new site.</span>
        </a>
    );
};

const Bookmark = ({ bookmark }) => {
    return (
        <a className="bookmark" href={bookmark.url} title={bookmark.name}>
            <img
                height="30px"
                width="30px"
                src={bookmark.logo}
                alt={`${bookmark.name}'s icon.`}
            />
            <span>{bookmark.name}</span>
            <div className="bookmark-remove" title="Remove">
                <X size={10} color={"#FFF"} />
            </div>
        </a>
    );
};

export default Bookmarks;
