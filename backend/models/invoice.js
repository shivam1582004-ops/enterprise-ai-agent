const { default: mongoose } = require("mongoose");

const invoiceSchema=mongoose.Schema({
    invoiceID:{
        type:Number,
        required:true,
        unique:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers',
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:['Paid','Unpaid'],
        required:true,
    }
});

const invoiceSchemaModel=mongoose.model("invoices",invoiceSchema);//mongoose.model('collection name', schema for this collection)

module.exports=invoiceSchemaModel;