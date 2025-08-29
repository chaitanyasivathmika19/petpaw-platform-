const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

// MongoDB Compass Connection
const dburl = "mongodb://localhost:27017/sdpproject"
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});


//MongoDb Atlas Connection
// const dburl = "mongodb+srv://2200032208:admin@cluster0.yrwgdre.mongodb.net/petadoption?retryWrites=true&w=majority"
// mongoose.connect(dburl).then(() => {
//     console.log("Connected to MongoDB Atlas Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


const app = express() 
app.use(cors())

// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(express.json()) 

const adminrouter = require("./routes/adminroutes")
const customerrouter = require("./routes/customerroutes")
const sellerrouter = require("./routes/sellerroutes");
const mainrouter = require("./routes/mainroutes");

app.use("",adminrouter) 
app.use("",customerrouter)
app.use("",sellerrouter) 
app.use("",mainrouter) 

const port=2014
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})