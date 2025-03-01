import React from 'react'
import Quotes from '../Components/Quotes'

function Landing() {

  const dummy = [{
    source: "User",
    quote: "cool as a cucumber"
  },
  {
    source: "Me",
    quote: "he said one day you'll leave this world behind... so live a life you will remember!"
  },
  {
    source: "Friend",
    quote: "if it breathes, it can be killed"
  }]


  return (

    <>
        <h1>Cringe Whatsapp quotes!</h1>
        <p>
            So this is a ridiculous project as specified in the question... I find it extremely hilarious how people put up quotes on their WhatsApp descriptions. So based on the user logging in it would show a list of the top 10 quotes that I find funny or interesting. I think that I can have a pre-determined set of top 10 quotes and every time a user logs in I can randomly pick a set of 10 quotes and go through them in something like a carousel that scrolls every second revealing the quotes from 10(last) to 1(top). The purpose of this website is for people to just get a good laugh.
        </p>
        <div>
          <br />
          <h3>Here are some quotes</h3>
          <div>
            {dummy.map((ele) => {
               return <Quotes source={ele.source} quote={ele.quote} />;
            })}
          </div>
        </div>
    </>
  )
}

export default Landing