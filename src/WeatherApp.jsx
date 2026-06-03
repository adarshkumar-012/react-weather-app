import { useState } from "react";
import SearchBox from "./SearchBox";

export default function WeatherApp() {

    let [darkMode, setDarkMode] = useState(false);

    let [weatherCondition, setWeatherCondition] =
        useState("Clear");

    let toggleMode = () => {
        setDarkMode(!darkMode);
    };

    let backgroundStyle;

    if (darkMode) {

        backgroundStyle = "#121212";

    } else if (
        weatherCondition
            .toLowerCase()
            .includes("rain")
    ) {

        backgroundStyle =
            "linear-gradient(to right, #4e54c8, #8f94fb)";

    } else if (
        weatherCondition
            .toLowerCase()
            .includes("cloud")
    ) {

        backgroundStyle =
            "linear-gradient(to right, #bdc3c7, #2c3e50)";

    } else if (
        weatherCondition
            .toLowerCase()
            .includes("clear")
    ) {

        backgroundStyle =
            "linear-gradient(to right, #f7971e, #ffd200)";

    } else if (
        weatherCondition
            .toLowerCase()
            .includes("snow")
    ) {

        backgroundStyle =
            "linear-gradient(to right, #83a4d4, #b6fbff)";

    } else {

        backgroundStyle =
            "linear-gradient(to right, #74ebd5, #ACB6E5)";
    }

    return (
        <div
            style={{
                textAlign: "center",
                minHeight: "100vh",
                paddingTop: "20px",

                background: backgroundStyle,

                color: darkMode
                    ? "white"
                    : "black",

                transition: "0.5s",
            }}
        >

            <button
                onClick={toggleMode}
                style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                {darkMode
                    ? "☀ Light Mode"
                    : "🌙 Dark Mode"}
            </button>

            <h1>🌤 Weather App</h1>

            <SearchBox
                darkMode={darkMode}
                setWeatherCondition={
                    setWeatherCondition
                }
            />

            <p style={{ marginTop: "2rem" }}>
                Made with ❤️ by Adarsh Gupta
            </p>

        </div>
    );
}