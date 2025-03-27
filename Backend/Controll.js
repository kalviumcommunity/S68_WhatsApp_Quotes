const express = require("express");
const router = express.Router();
const UserModel = require('./Model/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const { error } = require("console");
const Whats = require("./Model/Schema");

router.post("/post", async (req, res) => {
    try {
        const { name, email, quote } = req.body;

        if (!name || !email || !quote) {
            return res.status(400).json({ Message: "All fields are required." });
        }

        const isexist = await Whats.findOne({ quote: quote.trim().toLowerCase() });
        if (isexist) {
            console.log(isexist);
            return res.status(400).json({ Message: "The quote already exists :(" });
        }

        const wquote = new Whats({
            name: name,
            email: email,
            quote: quote
        });

        console.log(wquote);
        await wquote.save();
        
        res.status(200).json({ Message: "Successfully added the quote using post req!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: "Sorry there was an internal error with the post req", error: err.message });
    }
});

router.put("/update/:original", async (req, res) => {
    try {
        const original = req.params.original;
        const { name, email, quote } = req.body;

        const isExist = await Whats.findOne({ quote: original });
        if (!isExist) {
            return res.status(400).json({ message: "The quote does not exist..." });
        }

        const result = await Whats.updateOne(
            { quote: original }, 
            { $set: { name, email, quote } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "No changes were made." });
        }

        res.status(200).json({ message: "Successfully updated the quote!" });
    } catch (err) {
        res.status(500).json({
            message: "Sorry, bad request",
            error: err.message
        });
    }
});

router.get("/fetch/:original", async (req, res) => {
    try {
        const quote  = req.params.original;
        const isexist = await Whats.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "could not find!" });
        }
        res.status(200).json({
            message: "found the quote",
            quote: quote
        });
    } catch (err) {
        res.status(500).json({ Message: "bad request there has been an internal server error" });
    }
});

 router.delete("/del/:id", async (req, res) => {
    try {
        const { quote } = req.body;
        const isexist = await Whats.findOne({ quote: quote });
        if (!isexist) {
            return res.status(400).json({ Message: "The quote does not exist..." });
        }
        await Whatsapp.deleteOne({ _id: req.params.id });
        res.status(200).json({ Message: "Successfully deleted the quote!" });
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});
router.get("/fetchall", async (req, res) => {
    try {
        const all = await Whats.find();
        console.log(all)
        res.send(all);
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});

router.post("/signup",async (req,res)=>{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
  
    try {
      const isExist = await UserModel.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ message: "The user already exists!" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
})

router.post('/login', async (req,res)=>{ //login
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    try {
      const user = await UserModel.findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({ message: 'User does not exist!' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password!' });
      }

      jwt.sign(email,process.env.secretkey,(err,token)=>{
        if (err) {
            return res.status(500).json({ success: false, message: "Error generating token" });
        }

        res.cookie("authorization", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict", 
            maxAge: 24 * 60 * 60 * 1000, 
        })

      })

      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
})

router.post('/logout', (req, res) => { //logout
    res.clearCookie("authorization", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
});


router.get("/fetchallusers", async (req, res) => {
    try {
        const all = await UserModel.find();
        console.log(all)
        res.send(all);
    } catch (err) {
        res.status(500).json({ Message: "Sorry there was an internal error", error: err });
    }
});

module.exports = router;