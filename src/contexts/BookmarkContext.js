import React, { createContext, useState } from "react";
import { prefix, name_bookmarks } from "../config";
export const BookmarkContext = createContext([]);

export const BookmarkProvider = props => {
    let bookmarksFromLS =
        JSON.parse(localStorage.getItem([prefix + name_bookmarks])) || [];
    const [query, setQuery] = useState("");
    const [bookmarks, setBookmarks] = useState(bookmarksFromLS);

    return (
        <BookmarkContext.Provider
            value={[bookmarks, setBookmarks, query, setQuery]}
        >
            {props.children}
        </BookmarkContext.Provider>
    );
};
