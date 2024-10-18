import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_cloud from '../assets/clear cloud.webp'
import cloud from '../assets/cloud image.png'
import humidity from '../assets/humidity.webp'
import rain from '../assets/rain.png'
import snow from '../assets/snow-1024.webp'
import drizzle from '../assets/Weather_Flat-29-1024 drizzle.webp'
import wind from '../assets/wind icon.png'




function Weather() {

  const inputRef = useRef()


 const[weatherData,setweatherData]=useState(false);

  const allIcons ={
    "01d":clear_cloud,
    "01n":clear_cloud,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
    
}


  const search = async (city)=>{
    if(city == ""){
      alert("Enter City Name");
      return ;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_cloud;

      setweatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
      

    } catch (error) {
      
      
      
    }
  }


  useEffect(()=>{
    search("New York");
  },[])


  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <i class="fa-solid fa-magnifying-glass" id='icon' onClick={()=>search(inputRef.current.value)}></i>
        </div>
       <img src={weatherData.icon} alt="" className="weather-icon"/>
       <p className="temperature">{weatherData.temperature}°c</p>
       <p className='location'>{weatherData.location}</p>
<div className="weather-data">
  <div className="col">
    <img src={humidity} alt="" />
    <div>
    <p>{weatherData.humidity} %</p>
    <span>Humidity</span>       
    </div>
  </div>
  <div className="col">
    <img src={wind} alt="" />
    <div>
    <p>{weatherData.windspeed} Km/h</p>
    <span>Wind Speed</span>
    </div>
  </div>
  </div>


      
    </div>
  )
}

export default Weather
