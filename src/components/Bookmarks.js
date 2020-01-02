import React, { useContext } from "react";
import { X } from "react-feather";
import { defaultBookmarksHeight, regex_domain_name } from "../config";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import shortid from "shortid";
import { BookmarkContext } from "../contexts/BookmarkContext";
import { prefix, name_bookmarks, name_openinnewtab } from "../config";

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
                    {bookmarks &&
                    typeof bookmarks === "object" &&
                    bookmarks.length > 0
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
                              .sort((a, b) => {
                                  return (a.name < b.name ? -1 : 1) || 0;
                              })
                              .map(bookmark => (
                                  <Bookmark
                                      key={shortid.generate()}
                                      bookmark={bookmark}
                                  />
                              ))
                        : ""}
                </SimpleBar>
            </div>
        </div>
    );
};

const Bookmark = ({ bookmark }) => {
    let domainName = bookmark.url.match(regex_domain_name)[1];
    const [bookmarks, setBookmarks] = useContext(
        BookmarkContext
    );

    const removeBookmark = bookmarkToRemove => {
        const filteredBookmark = bookmarks.filter(_bookmark => {
            return (
                _bookmark.name !== bookmark.name &&
                _bookmark.url !== bookmark.url
            );
        });

        setBookmarks(filteredBookmark);
        localStorage.setItem(
            [prefix + name_bookmarks],
            JSON.stringify(bookmarks)
        );
    };

    const openBookmarkLink = bookmarkToOpen => {
        let openInNewTab =
            localStorage.getItem([prefix + name_openinnewtab]) === "true";
        console.log(
            localStorage.getItem([prefix + name_openinnewtab]),
            openInNewTab,
            " Open in new tab."
        );
        window.open(
            `${bookmarkToOpen.url}`,
            openInNewTab === true ? "_blank" : "_self"
        );
    };

    return (
        <a
            className="bookmark"
            href={bookmark.url}
            onClick={e => {
                e.preventDefault();
            }}
            title={`${bookmark.name}\n${bookmark.url}`}
        >
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
            <span onClick={() => openBookmarkLink(bookmark)}>
                {bookmark.name ||
                    (domainName[0].toUpperCase() + domainName.substr(1)).split(
                        "."
                    )[0]}
            </span>
            <div
                className="bookmark-remove"
                title="Remove"
                onClick={() => removeBookmark(bookmark)}
            >
                <X size={10} color={"#FFF"} />
            </div>
        </a>
    );
};

export default Bookmarks;
