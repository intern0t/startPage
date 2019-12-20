import React, { useState } from "react";
import Tick from "../feathers/check-square.svg";
import Unticked from "../feathers/square.svg";

const Search = ({ placeholder }) => {
    const [query, setQuery] = useState("");
    const [openInNewTab, toggleOpenInNewTab] = useState(false);

    function onEnterKey(e) {
        if (e.key === "Enter") {
            if (query && query !== "" && query.length > 0) {
                window.open(
                    `https://duckduckgo.com/?q=${query}`,
                    openInNewTab && openInNewTab === true ? "_blank" : "_self"
                );
            }
        }
    }

    return (
        <div className="app-wrapper-element">
            <input
                type="text"
                className="app-wrapper-element-text"
                placeholder={placeholder}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={onEnterKey}
                value={query}
                autoFocus
            />
            <img
                src={openInNewTab ? Tick : Unticked}
                alt="Search Icon"
                onClick={() => toggleOpenInNewTab(!openInNewTab)}
            />
        </div>
    );
};

export default Search;
