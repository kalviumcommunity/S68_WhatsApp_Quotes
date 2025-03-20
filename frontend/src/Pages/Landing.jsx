import React, { useEffect, useState } from 'react'
import Quotes from '../Components/Quotes'
import axios from 'axios'
import { useNavigate } from "react-router";
import Select from "react-select";

function Landing() {

  // const dummy = [{
  //   source: "User",
  //   quote: "cool as a cucumber"
  // },
  // {
  //   source: "Me",
  //   quote: "he said one day you'll leave this world behind... so live a life you will remember!"
  // },
  // {
  //   source: "Friend",
  //   quote: "if it breathes, it can be killed"
  // }]

  const [Data,setData] = useState([]);
  const [filter,setfilter] = useState("");
  const [users,setusers] = useState([{value:"",label:"All"}]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/main/fetchall');
            
            if (response.data) {
                setData(response.data); // Store the data in state
            } else {
              console.log("there was an error");
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const fetchUsers = async () => {
      try {
          const userRes = await axios.get('http://localhost:3000/main/fetchallusers');
          setusers([{value:"",label:"All"},...userRes.data.map((ele)=>{
            return {value:ele.name, label: ele.name}
          })]);
      } catch (err) {
          console.error("There was an error fetching users:", err);
      }
  };

    fetchData();
    fetchUsers();
}, []);


  return (

    <>
        <h1>Cringe Whatsapp quotes!</h1>
        <p>
            So this is a ridiculous project as specified in the question... I find it extremely hilarious how people put up quotes on their WhatsApp descriptions. So based on the user logging in it would show a list of the top 10 quotes that I find funny or interesting. I think that I can have a pre-determined set of top 10 quotes and every time a user logs in I can randomly pick a set of 10 quotes and go through them in something like a carousel that scrolls every second revealing the quotes from 10(last) to 1(top). The purpose of this website is for people to just get a good laugh.
        </p>
        <div>
          <button onClick={() => navigate("/add-data")}>Add yours</button>
        </div>
        <div>
          <br />
          <h3>Here are some quotes</h3>
          <div>
            {filter === ""?Data.map((ele) => {
               return <Quotes source={ele.name} quote={ele.quote} />;
            }):Data.filter((item)=>{return item.name === filter}).map((ele) => {
              return <Quotes source={ele.name} quote={ele.quote} />;
           })}
          </div>
          <div>
            <h3>filter by users</h3>
            <Select options={users} onChange={(e)=>setfilter(e.value)}     styles={{
    control: (base) => ({
      ...base,
      color: "white", // Text color inside the control
      backgroundColor: "black", // Background color of the dropdown
    }),
    singleValue: (base) => ({
      ...base,
      color: "white", // Selected text color
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      color: isSelected ? "white" : "black", // Text color
      backgroundColor: isSelected ? "blue" : isFocused ? "lightgray" : "white", // Background color on hover/select
    }),
  }}/>
          </div>
        </div>
    </>
  )
}

export default Landing