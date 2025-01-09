const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewURLParser:true,
        });
         console.log('MongoDB connected');
    }
    catch(error){
         console.log('Error connecting to MongoDB',error);
        process.exit(1);
    }
};
module.exports={connectDB};