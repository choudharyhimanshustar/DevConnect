const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewURLParser:true,
        });
         ('MongoDB connected');
    }
    catch(error){
         ('Error connecting to MongoDB',error);
        process.exit(1);
    }
};
module.exports={connectDB};