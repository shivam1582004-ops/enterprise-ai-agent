const express=require('express');

const router=express.Router();

const invoice=require("../models/invoice");
const customer = require("../models/customer");


router.get("/unpaid" ,async(req,res)=>{
    try{
    
    const minAmount=Number(req.query.minAmount)||0;

    const result= await invoice.find({status:"Unpaid", amount:{$gte:minAmount}}).populate('customer');

    res.json(result);
    console.log(result);
    
}catch(error){
    res.status(500).json({message:error.message})
}
});


module.exports=router;