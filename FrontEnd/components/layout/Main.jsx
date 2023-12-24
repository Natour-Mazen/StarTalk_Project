import '../../assets/css/components/layout/Main.css';
import React from "react";
import ScrollToTopButton from "../Button/ScrollToTopButton";

export default function Main({ children })
{
    return (
        <div className="Main">
            <ScrollToTopButton />
            {children}

        </div>
    );
}