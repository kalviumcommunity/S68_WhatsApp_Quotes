const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:"../.env"});

const auth = (req,res,next) => {
    try{
        const tokenauth = req.cookie.authorization;
        const secret = process.env.secretkey;

        if(!tokenauth){
            return res.status(401).json({message:"Unauthorised!"});
        }

        jwt.verify(tokenauth,secret,(err,decoded)=>{
            if(err){
                return res.status(401).json({Message:"Unauthorised!"})
            }
            req.user = decoded.email;
            next();
        })
    }
    catch(err){
        res.status(500).json({Message:"Authentication failed!"})
    }
}

module.exports = auth;