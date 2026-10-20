
const invoice=require("../models/invoice");
require("../models/customer");

async function getUnpaidInvoices(minAmount){

    const result= await invoice.find({status:"Unpaid",amount:{$gte:minAmount}}).populate("customer");
    return result;
}

module.exports=getUnpaidInvoices;