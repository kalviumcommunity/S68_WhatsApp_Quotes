const express = require('express');
const env = require('dotenv');
env.config()
const { connectDB } = require('./Database/db');
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.db_url;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
  
  try{
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  }
  catch(error){
    console.error(error);
  }
})
