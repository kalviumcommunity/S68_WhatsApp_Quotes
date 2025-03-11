import axios from 'axios';
import React, { useState } from 'react'

function Form() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        quote: ""
    });

    const handlesubmit = async () => {
        // if(!formdata.name || !formdata.email || !formdata.qoute){
        //     alert("all fields are required!")
        //     return
        // }

        try{
            await axios.post("http://localhost:3000/main/post",formdata)
            setformdata({
                name: "",
                email: "",
                quote: ""
            })
            console.log("Success")
            alert("success!");
        }

        catch(err){
            console.log("there was an error",err);
            alert("check the console, an error occured")
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

export default Form