const mongoose=require('mongoose');
async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Db Connect Successfully ");

    }
    catch(error){
        console.log("Error is coming that:",error.message);
    }

}
module.exports = dbConnect;