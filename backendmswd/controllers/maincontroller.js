const Product = require("../models/Product")
const Seller = require("../models/Seller")
const SellerApplicant = require("../models/SellerApplicant")
const viewproducts = async (request, response) => 
 {
    try 
    {
      const products = await Product.find();
      if(products.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(products);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const sellerapplicantregistration = async (request, response) => {
    try {
        const inputData = request.body;
        const existingEmail = await Seller.findOne({ email: inputData.email });
        const existingPhoneNumber = await Seller.findOne({ contact: inputData.contact });
        const existingUsername = await Seller.findOne({ username: inputData.username });

        if (existingEmail || existingPhoneNumber || existingUsername) {
            let message = '';
            if (existingEmail) {
                message += 'Seller with this email already exists. ';
            }
            if (existingPhoneNumber) {
                message += 'Seller with this phone number already exists. ';
            }
            if (existingUsername) {
                message += 'Seller with this username already exists.';
            }
            response.status(200).send(message);
        } else {
            const newSeller = new SellerApplicant(inputData);
            await newSeller.save();
            response.status(200).send('Seller registration successful. Further details will be sent to your email.');
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};

module.exports = sellerapplicantregistration;

  module.exports = {viewproducts,sellerapplicantregistration}