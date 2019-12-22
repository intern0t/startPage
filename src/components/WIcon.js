import React from "react";

const WIcon = ({ name }) => {
    let IconContent = require(`../misc/weather_icons/wi-${name}.svg`);
    return <img src={IconContent} alt={name} style={{ mask: "#FFF" }} />;
};

export default WIcon;
