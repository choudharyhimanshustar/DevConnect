const jwt=require('jsonwebtoken');
const User=require('../models/user');
const getUserFromToken=(token)=>{
    if(!token)return null;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        return  decoded.userEmail;
    }
    catch{
        return null;
    }
};
module.exports={getUserFromToken};