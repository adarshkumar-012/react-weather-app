import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import "./InfoBox.css";

export default function InfoBox({
    info,
    darkMode
}) {

    const HOT_URL =
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a";

    const COLD_URL =
        "https://images.unsplash.com/photo-1516912481808-3406841bd33c";

    const RAIN_URL =
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0";

    return (
        <div className="InfoBox">

            <div className="cardContainer">

                <Card
                    sx={{
                        maxWidth: 345,

                        backgroundColor: darkMode
                            ? "#1e1e1e"
                            : "#f5f5f5",
                    }}
                >

                    <CardMedia
                        sx={{ height: 180 }}
                        image={
                            info.humidity > 80
                                ? RAIN_URL
                                : info.temp > 15
                                    ? HOT_URL
                                    : COLD_URL
                        }
                        title="weather image"
                    />

                    <CardContent>

                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"

                            sx={{
                                color: darkMode
                                    ? "white"
                                    : "#111",

                                fontWeight: "bold",
                            }}
                        >

                            {info.city}, {info.country}

                            &nbsp;

                            {info.humidity > 80 ? (
                                <ThunderstormIcon />
                            ) : info.temp > 15 ? (
                                <SunnyIcon />
                            ) : (
                                <AcUnitIcon />
                            )}

                        </Typography>

                        <Typography
                            variant="body2"
                            component="div"

                            sx={{
                                color: darkMode
                                    ? "#ddd"
                                    : "#444",
                            }}
                        >

                            <div>
                                🌡 Temperature =
                                {info.temp}&deg;C
                            </div>

                            <br />

                            <div>
                                💧 Humidity =
                                {info.humidity}
                            </div>

                            <br />

                            <div>
                                🥶 Min Temp =
                                {info.temp_min}&deg;C
                            </div>

                            <br />

                            <div>
                                🔥 Max Temp =
                                {info.temp_max}&deg;C
                            </div>

                            <br />

                            <div>
                                💨 Wind Speed =
                                {info.windSpeed} km/h
                            </div>

                            <br />

                            <div>
                                🌅 Sunrise =
                                {new Date(
                                    info.sunrise * 1000
                                ).toLocaleTimeString()}
                            </div>

                            <br />

                            <div>
                                🌇 Sunset =
                                {new Date(
                                    info.sunset * 1000
                                ).toLocaleTimeString()}
                            </div>

                            <br />

                            <div>
                                The weather can be described as
                                <i> {info.weather} </i>
                                and feels like
                                {info.feels_like}&deg;C
                            </div>

                            <br />

                            <div>
                                🕒 {new Date().toLocaleString()}
                            </div>

                        </Typography>

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}