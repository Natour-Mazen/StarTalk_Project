import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/ThemeContext';
import {Button} from "primereact/button";

export default function ThemeToggleButton() {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <Button icon="fa-solid fa-circle-half-stroke" onClick={toggleTheme} title="Change theme (dark/light mode)"/>
    );
}
