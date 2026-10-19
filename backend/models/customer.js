const { default: mongoose } = require("mongoose");

const customerSchema=mongoose.Schema({
    customerId:{
        type: Number,
        required:true,
        unique:true,
        
    },
    customerName:{
        type: String,
        required:true,

    },
    customerEmail:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[12,'email must be at least 12 character'],
    },
    paymentHistory:{
        type:String,
    },
    relationNotes:{
        type:String,
    }

});

const customerSchemaModel=mongoose.model("customers",customerSchema);//mongoose.model('collection name', schema for this collection)

module.exports=customerSchemaModel;