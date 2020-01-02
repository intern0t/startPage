import React from "react";
import * as Icons from "@intern0t/react-weather-icons";

const WIcon = ({ name }) => {
    let _name = name
        .toLowerCase()
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

    let IconComponent = Icons[_name];
    return IconComponent != null ? (
        <IconComponent size={50} color="#6c6c6b" />
    ) : null;
};

export default WIcon;
