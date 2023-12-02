import React, { useContext } from 'react';
import { ThemeContext } from 'FrontEnd/utils/ThemeContext';

function ThemeToggleButton() {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Changer de thème
        </button>
    );
}
