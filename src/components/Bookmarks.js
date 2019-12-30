import React, { useState, useEffect, useContext } from "react";
import { X, Book } from "react-feather";
import { defaultBookmarksHeight, regex_domain_name } from "../config";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import shortid from "shortid";
import { BookmarkContext } from "../contexts/BookmarkContext";

// https://favicongrabber.com/service-api-reference

const Bookmarks = () => {
    const [bookmarks, setBookmarks, query, setQuery] = useContext(
        BookmarkContext
    );

    return (
        <div className="app-wrapper-element">
            <div className="bookmarks app-wrapper-element-inline">
                <SimpleBar
                    style={{
                        minHeight: defaultBookmarksHeight,
                        maxHeight: defaultBookmarksHeight,
                        width: "100%"
                    }}
                >
                    {/* Bookmarks here. */}
                    {bookmarks && typeof bookmarks === "object"
                        ? bookmarks
                              .filter(bookmark =>
                                  query && query.length > 0
                                      ? bookmark.name
                                            .toLowerCase()
                                            .indexOf(query.toLowerCase()) > 0 ||
                                        bookmark.url
                                            .toLowerCase()
                                            .indexOf(query.toLowerCase()) > 0
                                      : true
                              )
                              .map(bookmark => (
                                  <Bookmark
                                      bookmark={bookmark}
                                      key={shortid.generate()}
                                  />
                              ))
                        : null}
                </SimpleBar>
            </div>
        </div>
    );
};

const Bookmark = ({ bookmark }) => {
    let domainName = bookmark.url.match(regex_domain_name)[1];

    return (
        <a className="bookmark" href={bookmark.url} title={bookmark.url}>
            <img
                src={
                    bookmark.url
                        ? `https://www.google.com/s2/favicons?domain=${domainName}`
                        : null
                }
                alt={`${
                    bookmark.name && bookmark.name.length > 1
                        ? bookmark.name
                        : domainName[0].toUpperCase() + domainName.substr(1)
                }'s icon.`}
            />
            <span>
                {bookmark.name ||
                    (domainName[0].toUpperCase() + domainName.substr(1)).split(
                        "."
                    )[0]}
            </span>
            <div
                className="bookmark-remove"
                title="Remove"
                onClick={e => e.preventDefault()}
            >
                <X size={10} color={"#FFF"} />
            </div>
        </a>
    );
};

export default Bookmarks;
