import React, { createContext, useState } from "react";

export const BookmarkContext = createContext([]);

export const BookmarkProvider = props => {
    const [query, setQuery] = useState("");
    const [bookmarks, setBookmarks] = useState([
        {
            name: "Google",
            url: "https://google.com/"
        }
    ]);

    return (
        <BookmarkContext.Provider
            value={[bookmarks, setBookmarks, query, setQuery]}
        >
            {props.children}
        </BookmarkContext.Provider>
    );
};
