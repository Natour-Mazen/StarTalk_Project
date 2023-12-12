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
            document.body.setAttribute('data-theme', 'light');
        }
    }, [isDark]);

    const handlechangeTheme = async () => {
        setIsDark(!isDark);
    };
    return (
        <Button icon="fa-solid fa-circle-half-stroke" onClick={handlechangeTheme} title="Change theme (dark/light mode)"/>
    );
};
