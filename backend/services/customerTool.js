const mongoose=require('mongoose');

const customer=require("../models/customer");


async function getCustomerById(id){
    if(mongoose.isValidObjectId(id))
    {
        const result= await customer.findById(id);

            return result;

    }
    else{
        console.log("Error is coming : Invalid Customer ID");
        throw new Error("Invalid Customer ID");
    }
}

function escapeRegex(text)
{
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getCustomersByName(name) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error("Error is coming : Customer name is required, name is empty , null name");
    }
    
    const newName=name.trim();
    
    const result=await customer.find({customerName:{$regex:escapeRegex(newName), $options:'i'}});

    return result;
}


module.exports={getCustomerById,getCustomersByName};
