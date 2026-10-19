const mongoose=require('mongoose');
async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Db Connect Successfully ");

    }
    catch(error){
        console.log("Error aa rahi ki:",error.message);
    }

}
module.exports = dbConnect;