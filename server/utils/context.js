const jwt=require('jsonwebtoken');
const User=require('../models/user');
const getUserFromToken=(token)=>{
    if(!token)return null;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        return User.findById(decoded.userId);
    }
    catch{
        return null;
    }
};
module.exports={getUserFromToken};