const dotenv=require('dotenv');
dotenv.config();

const express=require("express");
const dbConnect=require("./config/dbConnect");
const invoiceRoute=require("./routes/invoicesRoutes");

const app=express();

dbConnect();

app.use(express.Router());


app.use('/invoice',invoiceRoute);

app.listen(5000,()=>{console.log("Server is running")});