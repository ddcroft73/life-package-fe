import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import Button from '../components/elements/Button';
import ToggleSwitch from '../components/elements/ToggleSwitch.js';

function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
        </Button>
    );
}

export default ThemeToggle;
