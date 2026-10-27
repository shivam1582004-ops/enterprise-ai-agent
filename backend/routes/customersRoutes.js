const express=require('express');

const router=express.Router();

const {getCustomerById,getCustomersByName}=require("../services/customerTool");

router.get("/byId", async(req,res)=>{
    try {
        const id=req.query.id;

        const result= await getCustomerById(id);
        
        console.log(result);

        if(!result){
            res.status(404).json({message:"Customer not Found"});
        }

        res.json(result);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.get("/byName", async (req,res)=>{
    try {

        const name=req.query.name;
        const result= await getCustomersByName(name);
        console.log(result);
        res.json(result);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});



module.exports=router;