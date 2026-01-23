import { useState, useEffect} from 'react'
import { CiLocationOn } from "react-icons/ci";

function WeatherForm ({onCitySubmit, onLocationSubmit}) {
    const [city, setCity] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
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
      
            <form 
                onSubmit={handleSubmit}
                >
                <label>
                    City: 
                    <input 
                        type="text"
                        value={city}
                        onChange={(event)=>setCity(event.target.value)} 
                    />
                </label>

                <CiLocationOn 
                    className="geo-icon" 
                    onClick={handleClickLocation} 
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                />

                <button type="submit">Submit</button>          

                  
            </form>
             

        </div> 

    )
}

export default WeatherForm;