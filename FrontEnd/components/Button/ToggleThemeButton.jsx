import React, { useState, useEffect } from 'react';
import { Button } from "primereact/button";

export default function ThemeToggleButton() {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDarkStarTalk') === 'true');

    applyTheme(isDark);

    function applyTheme(isDark) {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    }

    function handlechangeTheme() {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('isDarkStarTalk', newIsDark.toString());
    };

    const theIcon = isDark ? "pi pi-sun" :  "pi pi-moon";
    const theTitle = isDark ? "Change to light theme" : "Change to dark theme";

    return (
        <Button className='StartalkButton'
                icon={theIcon}
                onClick={handlechangeTheme}
                title={theTitle}
                outlined={false}
        />
    );
};
