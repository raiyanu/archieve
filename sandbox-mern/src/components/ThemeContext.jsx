import {createContext, useState} from 'react';

const ThemeContext = createContext();

function ThemeContextProvider(props) {
    const [darkTheme, setDarkTheme] = useState(false);
    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
export { ThemeContext };
export default ThemeContextProvider;