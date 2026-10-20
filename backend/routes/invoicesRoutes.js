const express=require('express');

const router=express.Router();

const getUnpaidInvoices=require('../services/invoiceTool');


router.get("/unpaid" ,async(req,res)=>{
    try{
    
    const minAmount=Number(req.query.minAmount)||0;

    const result=await getUnpaidInvoices(minAmount);

    console.log(result);
    res.json(result);
    
    
}catch(error){
    res.status(500).json({message:error.message})
}
});


module.exports=router;