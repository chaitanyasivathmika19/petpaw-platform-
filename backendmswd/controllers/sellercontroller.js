const Seller = require("../models/Seller.js")
const Product = require("../models/Product.js")
const Customer = require("../models/Customer.js")
const ProductOrder = require("../models/ProductOrder.js")
const nodemailer = require('nodemailer');
const axios = require('axios')

const  checksellerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const seller = await Seller.findOne(input)
     response.json(seller)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };
 const addproduct = async (request, response) => {
  try 
  {
    const input = request.body;
    const product = new Product(input);
    await product.save();
    response.send('Product Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};
const updatesellerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const seller = await Seller.findOne({ email });
      if (!seller) 
      {
        response.status(200).send('Seller not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          seller[key] = input[key];
        }
      }
      await seller.save();
      response.status(200).send('Seller Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };
  const sellerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const seller = await Seller.findOne({email})
        if(seller)
        {
          response.json(seller)
        }
        else
        {
          return response.status(200).send('Seller not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };
    const viewProductOrders = async (request, response) => {
      try {
        const remail = request.params.email;
    
        const productOrders = await ProductOrder.find({});
    
        const productIds = productOrders.map(order => order.productId);
    
        const products = await Product.find({
          _id: { $in: productIds },
          company: remail
        });
    
        let matchedOrders = [];
        products.forEach(product => {
          const orders = productOrders.filter(order => order.productId.toString() === product._id.toString());
          matchedOrders = matchedOrders.concat(orders);
        });
    
        if (matchedOrders.length === 0) {
          return response.status(200).send("No matching product orders found for this retailer");
        } else {
          return response.status(200).json(matchedOrders);
        }
      } catch (error) {
        response.status(500).send(error.message);
      }
    };
    
    
    const updateProductOrderStatus = async (request, response) => {
      try {
        const { orderId, status } = request.body;
    
        if (!orderId || !status) {
          return response.status(400).send('Order ID and status are required');
        }
    
        const updatedOrder = await ProductOrder.findOneAndUpdate(
          { orderId },
          { $set: { status } },
          { new: true }
        );
    
        const productResponse = await axios.get(`http://localhost:2014/productbyid/${updatedOrder.productId}`);
        const productName = productResponse.data.name;

        sendEmail(updatedOrder.customerEmail, status, productName);
    
        response.status(200).json(updatedOrder);
      } catch (error) {
        console.error('Error updating product order status:', error);
        response.status(500).send(error.message);
      }
    };
    const sendEmail = (recipient, status, productName) => {
      try {
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'petspaw0516@gmail.com',
            pass: 'qugc pkzo zoai lrku'
          }
        });
        const mailOptions = {
          from: '"Pets Paw" <petspaw0516@gmail.com>',
          to: recipient,
          subject: 'Your Order Status has been Changed',
          text: `Hello,\n\nYour Order for ${productName} has been Changed to: ${status}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            throw error;
          } else {
            console.log('Email sent:', info.response);
          }
        });
      } catch (error) {
        console.error('Error in sendEmail function:', error);
        throw error;
      }
    };
    const myProducts = async (request, response) => {
      try {
        const email = request.params.email;
        const products = await Product.find({ company: email });
        if (!products || products.length === 0) {
          return response.status(404).send('No products found for this user');
        }
        response.json(products);
      } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
      }
    };
    
    const updateProduct = async (request, response) => {
      try {
        const input = request.body;
        const productId = input._id;
        const product = await Product.findById(productId);
        if (!product) {
          return response.status(404).send('Product not found with the provided productId');
        }
        for (const key in input) {
          if (key !== 'productId' && input[key]) {
            product[key] = input[key];
          }
        }
        await product.save();
        response.status(200).send('Product Updated Successfully');
      } catch (e) {
        response.status(500).send(e.message);
      }
    };
    
  
  
    
 module.exports = {checksellerlogin,addproduct,updatesellerprofile,sellerprofile,viewProductOrders, updateProductOrderStatus,myProducts,updateProduct}