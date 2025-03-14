const express = require('express');
const env = require('dotenv');
env.config();
const connectDB  = require('./Database/db');
const router = require('./Controll');
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.db_url;
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});



app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
  
  try {
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
});

app.use("/main", router);
