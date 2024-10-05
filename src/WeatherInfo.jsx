import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Chart from './Chart'; // Import the Chart component
import "./SearchBox.css"

export default function WeatherInfo({info}) {
    const Hot_Url = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const Cold_Url = "https://images.unsplash.com/photo-1564314968303-86c5df2b9a4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const Rain_Url = "https://plus.unsplash.com/premium_photo-1671406233410-9727cf249910?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbiUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";

    return (
        <div className="weatherInfo">
            <div className="SearchBox">
                <Card sx={{}}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={info.humidity > 80 ? Rain_Url : info.temp > 15 ? Hot_Url : Cold_Url}
                        title="Weather Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.name} {info.humidity > 80 ? <ThunderstormIcon /> : info.temp > 15 ? <WbSunnyIcon /> : <AcUnitIcon />}
                            <div className='Temperature'>{info.temp}&deg;c</div>
                        </Typography>
                        {/* Add class for flex arrangement */}
                        <Typography variant="body2" component={"span"} sx={{ color: 'text.secondary' }} className="weatherDetails">
                            <div>
                                <Chart info={info} />
                            </div>
                            <div className="weatherText">
                                <p className='mintemp'>Min Temp = {info.tempmin}&deg;c</p>
                                <p className='maxtemp'>Max Temp = {info.tempmax}&deg;c</p>
                                <p className='feelslike'>Feels like = {info.feelslike}</p>
                                <p className='description'>The weather is described as <i>{info.description}</i> and feels like {info.feelslike}&deg;c</p>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
