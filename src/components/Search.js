import React, { useState } from 'react'

const Search = ({ placeholder }) => {
    const [query, setQuery] = useState("");

    function onEnterKey(e) {
        if (e.key === 'Enter') {
            if (query && query !== "" && query.length > 0) {
                window.location.href = `https://duckduckgo.com/?q=${query}`;
            }
        }
    }

    return <div className="app-wrapper-element">
        <input type="text" className="app-wrapper-element-text" placeholder={placeholder} onChange={(e) => setQuery(e.target.value)} onKeyPress={onEnterKey} value={query} autoFocus />
    </div>
}

export default Search;