import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./SearchBox.css";

import InfoBox from "./InfoBox";

export default function SearchBox({
    darkMode,
    setWeatherCondition
}) {

    const API_URL =
        "https://api.openweathermap.org/data/2.5/weather";

   const API_KEY = import.meta.env.VITE_API_KEY;

    let [city, setCity] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feels_like: 24.84,
        temp: 25.05,
        temp_min: 25.05,
        temp_max: 25.05,
        humidity: 47,
        weather: "Haze",
        windSpeed: 2.5,
        country: "IN",
        sunrise: 0,
sunset: 0,
    });

    let handleChange = (event) => {
        setCity(event.target.value);
    };
    const formatWeatherData = (jsonResponse) => {
        return {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp,
            temp_min: jsonResponse.main.temp_min,
            temp_max: jsonResponse.main.temp_max,
            feels_like: jsonResponse.main.feels_like,
            humidity: jsonResponse.main.humidity,
            weather: jsonResponse.weather[0].description,
            windSpeed: jsonResponse.wind.speed,
            country: jsonResponse.sys.country,
            sunrise: jsonResponse.sys.sunrise,
sunset: jsonResponse.sys.sunset,
        };
    };
    let getWeatherInfo = async () => {

        let response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        let jsonResponse = await response.json();
        if (jsonResponse.cod !== 200) {
            throw new Error("City not found");
        }

        return formatWeatherData(jsonResponse);
    };

    let handleSubmit = async (event) => {

        try {

            event.preventDefault();

            setLoading(true);

            let newInfo = await getWeatherInfo();

            setWeatherInfo(newInfo);
            setWeatherCondition(newInfo.weather);
            setError(false);

            setCity("");

        } catch (err) {

            setError(true);

        } finally {

            setLoading(false);

        }
    };

    let getCurrentLocationWeather = () => {

        navigator.geolocation.getCurrentPosition(async (position) => {

            let lat = position.coords.latitude;

            let lon = position.coords.longitude;

            let response = await fetch(
                `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            let jsonResponse = await response.json();
            if (jsonResponse.cod !== 200) {
                throw new Error("Location weather not found");
            }
            setWeatherInfo(formatWeatherData(jsonResponse));
            setWeatherCondition(jsonResponse.weather[0].main);
        });
    };

    useEffect(() => {
        getCurrentLocationWeather();
    }, []);

    return (
        <div className="search-box">

            <h3>Search for the weather</h3>

            <form onSubmit={handleSubmit}>

                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}

                    sx={{

                        input: {
                            color: darkMode
                                ? "white"
                                : "black",
                        },

                        label: {
                            color: darkMode
                                ? "white"
                                : "black",
                        },

                        "& .MuiOutlinedInput-root": {

                            "& fieldset": {
                                borderColor: darkMode
                                    ? "white"
                                    : "black",
                            },

                            "&:hover fieldset": {
                                borderColor: darkMode
                                    ? "white"
                                    : "black",
                            },
                        },
                    }}
                />

                <br /><br />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Search
                </Button>

                <br /><br />

                <Button
                    variant="outlined"
                    onClick={getCurrentLocationWeather}
                >
                    📍 Use Current Location
                </Button>

            </form>

            <br />

            {loading && (
                <div style={{ marginTop: "20px" }}>
                    <CircularProgress
                        color={darkMode ? "inherit" : "primary"}
                    />
                </div>
            )}

            {error && (
                <p
                    style={{
                        color: "red",
                        fontWeight: "bold",
                    }}
                >
                    No such place exists!
                </p>
            )}

            <InfoBox
                info={weatherInfo}
                darkMode={darkMode}
            />

        </div>
    );
}