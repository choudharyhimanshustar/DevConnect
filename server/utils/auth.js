// Authentication helpers for token generation
const jwt=require('jsonwebtoken');
const generateToken=(user)=>{
    return jwt.sign({
        userEmail:user.email},
        process.env.JWT_SECRET,
    );
};
module.exports={generateToken};