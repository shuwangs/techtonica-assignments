import { useState, useEffect} from 'react'

function WeatherForm ({onCitySubmit}) {
    const [city, setCity] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        onCitySubmit(city)
        return;
    }


    return (
        <div>
            <form 
                onSubmit={handleSubmit}>
                <label>
                    City: 
                    <input 
                        type="text"
                        value={city}
                        onChange={(event)=>setCity(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
        
            </form>
            

        </div> 

    )
}

export default WeatherForm;