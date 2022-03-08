
import './App.css';
// link para logo `https://openweathermap.org/img/w/${iconId}.png`
function WeatherBox(props){
    const weather = props.weather;
    const logoURL = props.logo;
    const switchTemp = props.switchTemp;
    const tempSystem = props.tempSystem;
    return(
        <div className='WeatherBox'>
            <h2>Weather App</h2>
            <b> {weather?.name},{weather?.sys?.country}</b>
            <img className= "logo" src={logoURL} alt="No logo"></img>
            <h3>{weather.weather?.[0].description}</h3>
            <h4>Humidity:{weather.main?.humidity}%</h4>
            {tempSystem === "metric"?<h3>{weather?.main?.temp} C°</h3> : <h3>{weather?.main?.temp} F°</h3>}
            {tempSystem === "metric"?<button onClick={switchTemp}>Switch to Farenheit</button> : <button onClick={switchTemp}>Switch to Celsius</button>}
            
             
        </div>
    )
};

export default WeatherBox;