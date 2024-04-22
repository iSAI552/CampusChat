// eslint-disable-next-line no-unused-vars
import React from "react";
import NavigationBar from "./NavigationBar";

// eslint-disable-next-line react/prop-types
function Container({ children }) {
    return (
        <>
            <NavigationBar />
            <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
        </>
    );
}

export default Container;
