// ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesUp} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/components/Button/ScrollToTop.css"

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        const mainElement = document.querySelector('.Main');
        if(mainElement) {
            const scrollDuration = 200;
            let currentTop = mainElement.scrollTop;
            let step = currentTop * 20 / scrollDuration;

            let scrollInterval = setInterval(() => {
                if (mainElement.scrollTop > 0) {
                    mainElement.scrollTop -= step;
                } else {
                    clearInterval(scrollInterval);
                }
            }, 20);
        }
    };

    useEffect(() => {
        const mainElement = document.querySelector('.Main');
        const scrollListener = () => {
            if (mainElement.scrollTop > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        mainElement.addEventListener('scroll', scrollListener);

        return () => {
            mainElement.removeEventListener('scroll', scrollListener);
        };
    }, []);

    return showButton ? (
        <div className="scroll-to-top" title="scroll to top" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faAnglesUp}/>
        </div>
    ) : null;
}
