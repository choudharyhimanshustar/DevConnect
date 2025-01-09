// User model with Mongoose
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        email:{type:String,required:true,unique:true},
        password:{type:String},
        otp:{type:Number},
        otpExpiry:{type:Date}
    }
);
const UserProfile=new mongoose.Schema(
    {
        name:{type:String,required:true},
        skills:[{type:String}],
        linkedin:{type:String},
        github:{type:String},
        about:{type:String},
        dp:{type:String,required:true}
    }
);
const User=mongoose.model('User',userSchema);
const Profile=mongoose.model('Profile',UserProfile);
module.exports={User,Profile};