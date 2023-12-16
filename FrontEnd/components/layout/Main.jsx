import '../../assets/css/components/layout/Main.css';
import '../../assets/css/components/Utils/ScrollToTop.css';
import React from "react";
import ScrollToTopButton from "../Button/ScrollToTopButton";
export default function Main({ children })
{
    return (
        <div className="Main">
            {children}
        </div>
    );
}