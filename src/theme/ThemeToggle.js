import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import Button from '../components/elements/Button';

function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
        </Button>
    );
}

export default ThemeToggle;
