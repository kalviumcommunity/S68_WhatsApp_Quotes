const express = require('express');
const env = require('dotenv');
env.config();
const connectDB  = require('./Database/db');
const router = require('./Controll');
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.db_url;
const cors = require('cors');
const pool = require('./Database/SQLDB');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.get('/ping', (req, res) => {
  res.send('pong');
});



app.listen(port, async () => {  
  try {
    await connectDB(url);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
  console.log(`listening at http://localhost:${port}`);
});

app.get("/test", async (req,res)=>{
  try {
      const [rows] = await pool.query("SELECT 'database connected!' AS message");
      res.status(200).json(rows[0]);
  } catch (error) {
      console.log("an error occured", error);
      res.status(500).json({error: error})
  }
})

app.use("/main", router);
