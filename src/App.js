import React from 'react';
import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import WeatherBox from './WeatherBox';

function App() {
  const apiKey = "e5e5fa96983e754e12ac72221041228e";
  //State que guarda la ubicacion
  const [location,setLocation] = useState({});
  //State que guarda info del clinma
  const [weather,setWeather] = useState({});
  //url para el logo del clima
  const [logo,setLogo] =useState("undefined")
  // sistema metrico o imperial(celcius o farenheit)
  const [tempSystem,setTempSystem] = useState("metric")
  //Se ejecuta al inicio para obtener ubicacion
  useEffect(
    getLocation
  ,[]);
  useEffect(getWeather,[location,tempSystem])
  
  useEffect(getLogo,[weather])

  //Funcion que obtiene la ubicacion y la guarda en state
  function getLocation(){
    function success(pos) {
      var crd = pos.coords;
      setLocation(crd);
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    };
    navigator.geolocation.getCurrentPosition(success);
  };
  //Usando las coordinadas que obtuvimos, se obtiene el clima 
  function getWeather(){
    if (location.latitude !== undefined){
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=${tempSystem}`;
      console.log(apiURL);
    axios.get(apiURL)
    .then(res => {
      console.log(res.data);
      setWeather(res.data);
    });
    };
        
  };
//obtenemos el logo del clima actual
  function getLogo(){
    if (weather.weather !== undefined){
      const iconId = weather.weather[0].icon;
      setLogo(`https://openweathermap.org/img/w/${iconId}.png`)
    }

  };
  // funcion para cambiar el sistema de temperatura
  function switchTemp(){
    if (tempSystem === "metric"){
      setTempSystem("imperial")
    }else{
      setTempSystem("metric")
    };
  };
//------------------------------------------------------------
  return (
    <div className="App">
      <WeatherBox weather={weather} logo={logo} switchTemp={switchTemp} tempSystem={tempSystem}/>
    </div>
  );
}

export default App;
