import { useState, useEffect} from 'react'

function WeatherForm () {
    const [city, setCity] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();

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
                <input type="submit" value="Submit" />
        
            </form>
            

        </div> 

    )
}

export default WeatherForm;