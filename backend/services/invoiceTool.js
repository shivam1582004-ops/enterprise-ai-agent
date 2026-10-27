
const mongoose = require("mongoose");
const invoice=require("../models/invoice");
require("../models/customer");

async function getUnpaidInvoices(minAmount){

    const result= await invoice.find({status:"Unpaid",amount:{$gte:minAmount}}).populate("customer");
    return result;
}

async function getInvoicesByCustomerId(customerId)
{
    if(mongoose.isValidObjectId(customerId))
    {
        const result = await invoice.find({customer:customerId});
        return result;
    }
    else
    {
        throw new Error("Invalid Customer ID");
    }
}

module.exports={getUnpaidInvoices,getInvoicesByCustomerId};