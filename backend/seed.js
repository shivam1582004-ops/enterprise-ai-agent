const dotenv=require('dotenv');
dotenv.config();

const mongoose=require('mongoose');

const dbConnect=require('./config/dbConnect');

const customer=require('./models/customer');
const invoice=require('./models/invoice');

const customerData=[
    {
    customerId: 1,
    customerName: "Rajesh Textiles",
    customerEmail: "accounts@rajeshtextiles.com",
    paymentHistory: "Usually pays 10-15 days late, but has never defaulted.",
    relationNotes: "Long-term client since 2019. Prefers a phone call before any email follow-up.",
  },
  {
    customerId: 2,
    customerName: "Sharma Electronics",
    customerEmail: "finance@sharmaelectronics.in",
    paymentHistory: "Always pays on time. Large orders every quarter.",
    relationNotes: "Key account. Owner is very particular about polite, formal communication.",
  },
  {
    customerId: 3,
    customerName: "Patil Agro Industries",
    customerEmail: "billing@patilagro.co.in",
    paymentHistory: "Payments often delayed during harvest season (Oct-Nov), clears dues in bulk later.",
    relationNotes: "Seasonal business. Responds better to messages in Marathi or simple English.",
  },
  {
    customerId: 4,
    customerName: "Mehta Pharma Distributors",
    customerEmail: "payables@mehtapharma.com",
    paymentHistory: "Two invoices in the last year were paid more than 45 days late after multiple reminders.",
    relationNotes: "Needs a firm follow-up. Finance head is Mr. Mehta, usually replies only to emails copied to him.",
  },
  {
    customerId: 5,
    customerName: "Kulkarni Constructions",
    customerEmail: "office@kulkarniconstruction.in",
    paymentHistory: "Pays in installments. Large invoices are usually split into two or three payments.",
    relationNotes: "Project-based client. Payment depends on milestone approvals from their own clients.",
  },
  {
    customerId: 6,
    customerName: "Desai Foods Pvt Ltd",
    customerEmail: "ap@desaifoods.com",
    paymentHistory: "New customer (2026). No late payments so far, only two invoices till now.",
    relationNotes: "Growing account. Friendly tone works well, they like quick responses.",
  },
];

const invoiceData=[
    { invoiceID: 1001, customerIndex: 0, amount: 150000, dueDate: "2026-09-15", status: "Unpaid" },
  { invoiceID: 1002, customerIndex: 0, amount: 45000, dueDate: "2026-08-10", status: "Paid" },
  { invoiceID: 1003, customerIndex: 0, amount: 85000, dueDate: "2026-10-30", status: "Unpaid" },
  { invoiceID: 1004, customerIndex: 1, amount: 320000, dueDate: "2026-09-01", status: "Paid" },
  { invoiceID: 1005, customerIndex: 1, amount: 275000, dueDate: "2026-10-20", status: "Unpaid" },
  { invoiceID: 1006, customerIndex: 2, amount: 120000, dueDate: "2026-09-05", status: "Unpaid" },
  { invoiceID: 1007, customerIndex: 2, amount: 60000, dueDate: "2026-07-25", status: "Paid" },
  { invoiceID: 1008, customerIndex: 3, amount: 210000, dueDate: "2026-08-20", status: "Unpaid" },
  { invoiceID: 1009, customerIndex: 3, amount: 95000, dueDate: "2026-09-10", status: "Unpaid" },
  { invoiceID: 1010, customerIndex: 3, amount: 30000, dueDate: "2026-06-15", status: "Paid" },
  { invoiceID: 1011, customerIndex: 4, amount: 480000, dueDate: "2026-09-25", status: "Unpaid" },
  { invoiceID: 1012, customerIndex: 4, amount: 250000, dueDate: "2026-08-05", status: "Paid" },
  { invoiceID: 1013, customerIndex: 4, amount: 70000, dueDate: "2026-10-12", status: "Unpaid" },
  { invoiceID: 1014, customerIndex: 5, amount: 55000, dueDate: "2026-09-18", status: "Paid" },
  { invoiceID: 1015, customerIndex: 5, amount: 130000, dueDate: "2026-11-05", status: "Unpaid" },
  { invoiceID: 1016, customerIndex: 1, amount: 18000, dueDate: "2026-07-30", status: "Paid" },
];

async function seedConnect()
{
    try{
        await dbConnect();
        console.log("connect ho gya");

        await customer.deleteMany({});
        await invoice.deleteMany({});

        const insertCustomer= await customer.insertMany(customerData);
        console.log(insertCustomer.length,'Customer Inserted');

        const insertToInvoice=invoiceData.map((i)=>({
            invoiceID:i.invoiceID,
            customer:insertCustomer[i.customerIndex]._id,
            amount:i.amount,
            dueDate:new Date(i.dueDate),
            status:i.status,
        }));

        const insertInvoice=await invoice.insertMany(insertToInvoice);
        console.log(insertInvoice.length,'Invoices Inserted');
    }
    catch(error)
    {
        console.log("seeding me error aa rahi ki:",error.message);
    }
    finally{
        await mongoose.connection.close();
        console.log('Connection Close ho gaya');
    }

};

seedConnect();