import React, { useState, useEffect } from "react";
import { CheckSquare, Square, X, Plus } from "react-feather";
import { prefix, name_openinnewtab } from "../config";

const Search = ({ placeholder }) => {
    const [query, setQuery] = useState("");
    const [openInNewTab, toggleOpenInNewTab] = useState(
        localStorage &&
            localStorage.getItem([prefix + name_openinnewtab]) !== null
            ? JSON.parse(localStorage.getItem([prefix + name_openinnewtab]))
            : true
    );

    useEffect(() => {
        // Has value regarding this feature, load it.
        localStorage.setItem([prefix + name_openinnewtab], openInNewTab);

        return () => {
            console.log("Open in new tab setting, updated!");
        };
    }, [openInNewTab]);

    function onEnterKey(e) {
        if (e.key === "Enter") {
            if (query && query !== "" && query.length > 0) {
                window.open(
                    `https://duckduckgo.com/?q=${query}`,
                    openInNewTab && openInNewTab === true ? "_blank" : "_self"
                );
                this.searchField.focus();
            }
        }
    }

    return (
        <div className="app-wrapper-element">
            <div className="app-wrapper-element-inline">
                <input
                    type="text"
                    className="app-wrapper-element-text"
                    placeholder={placeholder}
                    onChange={e => setQuery(e.target.value)}
                    onKeyPress={onEnterKey}
                    value={query}
                    ref={input => {
                        input && input.focus();
                    }}
                    autoFocus
                />
                <NewTabHandler
                    openInNewTab={openInNewTab}
                    toggleOpenInNewTab={toggleOpenInNewTab}
                    setQuery={setQuery}
                    color={"rgba(255,255,255, 0.5)"}
                    size={20}
                    title={"Toggle open search in new tab."}
                />
            </div>
        </div>
    );
};

const NewTabHandler = ({
    title,
    size,
    color,
    openInNewTab,
    toggleOpenInNewTab,
    setQuery
}) => {
    return (
        <div className="inline-icon" title={title}>
            <div title="Clear search field.">
                <X color={color} size={20} onClick={() => setQuery("")} />
            </div>
            <div title="Open search in new tab.">
                {openInNewTab ? (
                    <CheckSquare
                        color={color}
                        size={size}
                        onClick={() => toggleOpenInNewTab(!openInNewTab)}
                    />
                ) : (
                    <Square
                        color={color}
                        size={size}
                        onClick={() => toggleOpenInNewTab(!openInNewTab)}
                    />
                )}
            </div>
            <div title="Add a new bookmark.">
                <Plus color={color} size={20} />
            </div>
        </div>
    );
};

export default Search;
