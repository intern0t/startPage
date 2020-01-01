import React, { useState, useEffect, useContext } from "react";
import { CheckSquare, Square, X, Plus } from "react-feather";
import {
    prefix,
    name_openinnewtab,
    name_bookmarks,
    regex_url_validity,
    cors_proxy,
    regex_site_title
} from "../config";
import { BookmarkContext } from "../contexts/BookmarkContext";

const Search = ({ placeholder }) => {
    let searchBox = null;
    const [title, settitle] = useState("");
    const [bookmarks, setBookmarks, query, setQuery] = useContext(
        BookmarkContext
    );
    const [openInNewTab, toggleOpenInNewTab] = useState(
        localStorage &&
            localStorage.getItem([prefix + name_openinnewtab]) !== null
            ? JSON.parse(localStorage.getItem([prefix + name_openinnewtab]))
            : true
    );

    useEffect(() => {
        // Has value regarding this feature, load it.
        localStorage.setItem([prefix + name_openinnewtab], openInNewTab);
        localStorage.setItem(
            [prefix + name_bookmarks],
            JSON.stringify(bookmarks)
        );
        return () => {
            console.log(";)");
        };
    }, [openInNewTab, query]);

    function onKeyPress(e) {
        if (e.key === "Enter") {
            if (query && query !== "" && query.length > 0) {
                window.open(
                    `https://duckduckgo.com/?q=${query}`,
                    openInNewTab && openInNewTab === true ? "_blank" : "_self"
                );
                searchBox.focus();
            }
        }
    }

    function onKeyUp(e) {
        if (e.keyCode === 27) {
            setQuery("");
            searchBox.focus();
        }
    }

    const addBookmark = bookmarkToAdd => {
        if (
            bookmarkToAdd &&
            bookmarkToAdd.url &&
            bookmarkToAdd.url.match(regex_url_validity)
        ) {
            fetch(`${cors_proxy}${bookmarkToAdd.url}`)
                .then(res => res.text())
                .then(
                    content => {
                        let title =
                            content
                                .match(regex_site_title)[0]
                                .replace("<title>", "")
                                .replace("</title>", "") || "Unknown";

                        const duplicateBookmarks = bookmarks.filter(
                            bookmark => bookmark.url === bookmarkToAdd.url
                        );
                        if (
                            duplicateBookmarks &&
                            duplicateBookmarks.length > 0
                        ) {
                            return false;
                        } else {
                            bookmarkToAdd.url = bookmarkToAdd.url.replace(
                                "www",
                                ""
                            );

                            bookmarkToAdd.name =
                                title[0].toUpperCase() + title.substr(1);
                            setBookmarks(prevBookmarks => [
                                ...prevBookmarks,
                                bookmarkToAdd
                            ]);
                        }
                    }
                );
        }
        setQuery("");
        searchBox.focus();
    };

    return (
        <div className="app-wrapper-element">
            <div className="app-wrapper-element-inline">
                <input
                    type="text"
                    className="app-wrapper-element-text"
                    placeholder={placeholder}
                    onChange={e => setQuery(e.target.value || "")}
                    onKeyPress={onKeyPress}
                    onKeyUp={onKeyUp}
                    value={query}
                    ref={element => (searchBox = element)}
                    autoFocus
                />
                <NewTabHandler
                    openInNewTab={openInNewTab}
                    toggleOpenInNewTab={toggleOpenInNewTab}
                    setQuery={setQuery}
                    color={"rgba(255,255,255, 0.5)"}
                    size={20}
                    title={"Toggle open search in new tab."}
                    query={query}
                    searchBoxRef={searchBox}
                    addBookmark={addBookmark}
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
    setQuery,
    query,
    searchBoxRef,
    addBookmark
}) => {
    return (
        <div className="inline-icon" title={title}>
            <div title="Clear search field.">
                <X
                    color={color}
                    size={20}
                    onClick={() => setQuery("") && searchBoxRef.focus()}
                />
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
            <div
                title="Add a new bookmark."
                onClick={e => {
                    e.preventDefault();
                    addBookmark({ name: "", url: query });
                }}
            >
                <Plus color={color} size={20} />
            </div>
        </div>
    );
};

export default Search;
