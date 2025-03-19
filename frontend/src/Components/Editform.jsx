import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function Editform() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        quote: ""
    });

    const location = useLocation();
    const original = location.state.quote;

    useEffect({
         const fetchQuote = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/main/fetch/${quote}`)
                setformdata({
                    name:response.name,
                    email:response.email,
                    quote:response.quote
                });
            }
            catch(err){
                console.log("there was an error fetching the data!", err);
            }
        }

        fetchQuote();
    },[])

    const handlesubmit = async (e) => {
        e.preventdefault();
        if(!formdata.name || !formdata.email || !formdata.quote){
            return console.log("all fields are needed!")
        }
        try{
            const putting = axios.put(`http://localhost:3000/main/update/${quote}`);
            console.log("successfully updated object");
        }
        catch(err){
            console.log("there was an error while updating the data.")
        }
    }

  return (
    <>
    <form onSubmit={(e)=>handlesubmit(e)}>
        <div>
            <label>Name</label>
            <input type="text" value={formdata.name} onChange={(e)=>setformdata({...formdata,name:e.target.value})} />
        </div>
        
        <div>
            <label>email</label>
            <input type="text" value={formdata.email} onChange={(e)=>setformdata({...formdata,email:e.target.value})} />
        </div>

        <div>
            <label>Quote</label>
            <input type="text" value={formdata.quote} onChange={(e)=>setformdata({...formdata,quote:e.target.value})} />
        </div>    

        <div>
            <input type="submit" />
        </div>
    </form>
</>
  )
}

export default Editform