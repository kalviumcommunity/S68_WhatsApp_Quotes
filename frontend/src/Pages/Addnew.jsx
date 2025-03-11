import React, { useState } from 'react'

function Addnew() {
    const [formdata, setformdata] = useState({
        name: "",
        email:"",
        quote:""
    });

  return (
    <div>
        <form action="">
            <div>
                <label>Name</label>
                <input type="text" onChange={(e)=>setformdata({...formdata,name:e.target.value})} />
            </div>

            <div>
                <label>Email</label>
                <input type="text" onChange={(e)=>setformdata({...formdata,email:e.target.value})} />
            </div>

            <div>
                <label>Quote</label>
                <input type="text" onChange={(e)=>setformdata({...formdata,quote:e.target.value})} />
            </div>
        </form>
    </div>
  )
}

export default Addnew