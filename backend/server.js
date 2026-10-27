const dotenv=require('dotenv');
dotenv.config();

const express=require("express");
const dbConnect=require("./config/dbConnect");
const invoiceRoute=require("./routes/invoicesRoutes");
const customerRoute=require("./routes/customersRoutes");

const app=express();

dbConnect();        

app.use(express.Router());


app.use('/invoice',invoiceRoute);
app.use('/customer',customerRoute);

app.listen(5000,()=>{console.log("Server is running")});