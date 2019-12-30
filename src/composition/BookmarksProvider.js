import React, { Component, createContext } from "react";
import { regex_url_validity } from "../config";
const { Consumer, Provider } = createContext();

class BookmarksProvider extends Component {
    state = {
        bookmarks: [{ name: "Google", url: "https://google.com" }],
        query: ""
    };

    setQuery = query => {
        if (query && typeof query === "string") {
            this.setState(
                state => ({
                    ...state,
                    query
                }),
                () => {
                    console.log("Done searching!");
                }
            );
        }
    };

    addBookmark = bookmarkToAdd => {
        if (
            bookmarkToAdd &&
            bookmarkToAdd.url &&
            bookmarkToAdd.url.match(regex_url_validity)
        ) {
            const duplicateBookmarks = this.state.bookmarks.filter(
                bookmark => bookmark.url === bookmarkToAdd.url
            );

            if (duplicateBookmarks && duplicateBookmarks.length > 0) {
                return false;
            } else {
                const matchURL = bookmarkToAdd.url.match(regex_url_validity);

                if (matchURL && matchURL.length > 0) {
                    bookmarkToAdd.name = bookmarkToAdd.name
                        ? bookmarkToAdd.name
                        : matchURL && matchURL[1]
                        ? matchURL[1].split(".")[0]
                        : "Unknown";
                    this.setState(
                        state => ({
                            ...state,
                            bookmarks: [...state.bookmarks, bookmarkToAdd]
                        }),
                        () => {
                            console.log(
                                "Added a new bookmark. ",
                                bookmarkToAdd
                            );
                        }
                    );
                }
            }
        }
    };

    render() {
        return (
            <Provider
                value={{
                    bookmarks: this.state.bookmarks,
                    addBookmark: this.addBookmark,
                    query: this.state.query,
                    setQuery: this.setQuery
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export { BookmarksProvider };
export default Consumer;
