import React, {useContext, useEffect} from 'react';
import {Button} from "primereact/button";
import {useLocalStorage} from "primereact/hooks";


export default function ThemeToggleButton() {
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);

    useEffect(() => {
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme')
        }
    }, [isDark]);

    const handlechangeTheme = async () => {
        setIsDark(!isDark);
    };

    const theIcon = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    const theTitle = isDark ? "Change to light theme" : "Change to dark theme";

    return (
        <Button className='StartalkButton'
                icon={theIcon}
                onClick={handlechangeTheme}
                title={theTitle}
        />
    );
};
