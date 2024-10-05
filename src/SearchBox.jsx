import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState('');
    const [error, setError] = useState(null); // Correct error state handling
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '8ad0d491c6cbb6564cdafcd8dcd41dc4';

    // Function to fetch weather info
    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found"); // Handle non-200 responses
            }
            let data = await response.json();
            let result = {
                name: data.name,
                temp: data.main.temp,
                tempmin: data.main.temp_min,
                tempmax: data.main.temp_max,
                humidity: data.main.humidity,
                feelslike: data.main.feels_like,
                description: data.weather[0].description,
            };
            return result;
        } catch (err) {
            setError(err.message); // Set error state
            return null;
        }
    };

    // Handle city input change
    const handleCity = (event) => {
        setCity(event.target.value);
    };

    // Handle form submission
    const submitHandle = async (e) => {
        e.preventDefault(); // Prevent page reload
        setError(null); // Reset error state before new request
        const newInformation = await getWeatherInfo(); // Fetch weather data
        if (newInformation) {
            updateInfo(newInformation); // Update the parent component with the new data
            setCity(''); // Clear the input
        }
    };

    // Function to close the Alert message
    const handleCloseAlert = () => {
        setError(null); // Clear the error message
    };

    return (
        <div className="SearchBoxWrapper">
            <div className="SearchBox">
                <h2>Weather App</h2>
                <form onSubmit={submitHandle}>
                    <div style={{ backgroundColor: 'lightgray', border: '2px solid white', borderRadius: '20px', display: 'flex' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'black' }} // Set the text color to black for better visibility on light background
                            placeholder="Search City Weather"
                            id="city"
                            label="City Name"
                            type="search"
                            value={city}
                            required
                            onChange={handleCity}
                        />
                        <IconButton type="submit" sx={{ p: '10px', color: 'black' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </div>

                    {/* Display error message if city not found */}
                    {error && (
                        <Alert severity="error" onClose={handleCloseAlert}>
                            Error: {error}
                        </Alert>
                    )}
                </form>
            </div>
        </div>
    );
}
