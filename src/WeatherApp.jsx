import { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import Chart from "./Chart";
export default function WeatherApp() {
    const [weatherInformation, setWeatherInformation] = useState({
        name: "Loading...",
        description: "",
        feelslike: "",
        humidity: "",
        temp: "",
        tempmax: "",
        tempmin: "",
    });

    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '8ad0d491c6cbb6564cdafcd8dcd41dc4';
    
    // List of random cities
    const cities = ["New York", "Tokyo", "Mumbai", "London", "Sydney", "Paris", "Berlin", "Pune", "Dubai"];

    // Function to fetch weather for a random city
    const fetchRandomCityWeather = async () => {
        const randomCity = cities[Math.floor(Math.random() * cities.length)]; // Get a random city
        try {
            const response = await fetch(`${API_URL}?q=${randomCity}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            const result = {
                name: data.name,
                description: data.weather[0].description,
                feelslike: data.main.feels_like,
                humidity: data.main.humidity,
                temp: data.main.temp,
                tempmax: data.main.temp_max,
                tempmin: data.main.temp_min,
            };
            setWeatherInformation(result); // Update weather information
        } catch (error) {
            console.error("Error fetching random city weather:", error);
        }
    };

    useEffect(() => {
        // Fetch weather for a random city when the component mounts
        fetchRandomCityWeather();
    }, []);

    // Function to update weather information when search is made
    const updateWeatherInfo = (newInformation) => {
        setWeatherInformation(newInformation);
    };

    return (
        <div className="weather-app">
            <SearchBox updateInfo={updateWeatherInfo} />
            <WeatherInfo info={weatherInformation} />
        </div>
    );
}
