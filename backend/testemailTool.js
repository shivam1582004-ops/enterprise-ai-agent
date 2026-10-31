const dotenv=require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const dbConnect=require("./config/dbConnect");
const { getUnpaidInvoices } = require("./services/invoiceTool");
const draftFollowUpEmail=require("./services/emailTool");

async function test() {
    try {
        await dbConnect();

        const invoices = await getUnpaidInvoices(0);
        const targets = [1008, 1001, 1006]; // Mehta, Rajesh, Patil

        for (const id of targets) {
            const inv = invoices.find((i) => i.invoiceID === id);
            if (!inv) {
                console.log(`Invoice ${id} not found`);
                continue;
            }

            console.log(`\n--- Invoice ${id}: ${inv.customer.customerName} ---`);
            const email = await draftFollowUpEmail(inv, inv.customer);
            console.log(email);
        }
    } catch (error) {
        console.log("Test error:", error.message);
    } finally {
        await mongoose.connection.close();
    }
}

test();