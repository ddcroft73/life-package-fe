import "./App.css";
import Login from "./components/Login.js";
import ThemeManager from "./theme/ThemeManager";
import ThemeToggle from "./theme/ThemeToggle";

// For now I am concentrating on building my components. This will be the area where I test them, and later
// it will conform to the FE of my app. Startting with the Logon Registration components
// I do not want to use ANY aftermarlket component libraries, This is all me.

const App = () => {
    return (
        <ThemeManager>
            <ThemeToggle />
            <Login />
        </ThemeManager>
    );
};

export default App;
