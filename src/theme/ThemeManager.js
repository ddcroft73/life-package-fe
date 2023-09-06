// ThemeManager.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';

const ThemeManager = ({ children }) => {
    // Check for user preference at the start
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        // Apply the class based on the theme
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeProvider value={{ theme, setTheme }}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeManager;
