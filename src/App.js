import React from 'react';
import "./styles/build/startpage.min.css";
import DateTime from './components/DateTime';
import Search from './components/Search';

function App() {
	return (
		<div className="app">
			<div className="app-wrapper">
				{/* Date & Time */}
				<DateTime />

				{/* DuckDuckGo! search field. */}
				<Search placeholder="Privacy focused search using DuckDuckGo!" />

				{/* Credits */}
				{/* <div className="credit">Prashant Shrestha</div> */}
			</div>
		</div>
	);
}

export default App;
