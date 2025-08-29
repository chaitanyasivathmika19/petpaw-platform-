const sellercontroller = require("../controllers/sellercontroller")

const express=require('express')
const sellerrouter = express.Router()

sellerrouter.post("/checksellerlogin",sellercontroller.checksellerlogin)
sellerrouter.post("/addproduct",sellercontroller.addproduct)
sellerrouter.put("/updatesellerprofile",sellercontroller.updatesellerprofile);
sellerrouter.get("/sellerprofile/:email",sellercontroller.sellerprofile)
sellerrouter.get("/viewproductorders/:email", sellercontroller.viewProductOrders);
sellerrouter.put("/updateproductorderstatus", sellercontroller.updateProductOrderStatus);
sellerrouter.get("/myproducts/:email", sellercontroller.myProducts)
sellerrouter.put('/products/:productId', sellercontroller.updateProduct);

module.exports=sellerrouter