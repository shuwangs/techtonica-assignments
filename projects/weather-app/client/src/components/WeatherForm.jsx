import { useState} from 'react'
import { CiLocationOn } from "react-icons/ci";
import './WeatherCard.css';

function WeatherForm ({onCitySubmit, onLocationSubmit}) {
    const [city, setCity] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        if (!city.trim()) return; 
        onCitySubmit(city)
        setCity("");
        return;
    }

    const handleClickLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>{
                console.log("Success:", position);
                try {
                    const {latitude, longitude} = position.coords;
                    onLocationSubmit(latitude, longitude);
                } catch(err) {
                    console.error("Getting Location Error:", err);
                    alert("Couldnot get your location")
                }

            })
        }
    }


    return (
        <div>   
      
            <form onSubmit={handleSubmit}>
                <div className="city-row">

                    <label>
                        City: 
                        <input 
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(event)=>setCity(event.target.value)} 
                        />
                    </label>

                    <CiLocationOn 
                        className="geo-icon" 
                        onClick={handleClickLocation} 
                    />
                 </div>

                  
            </form>
             

        </div> 

    )
}

export default WeatherForm;