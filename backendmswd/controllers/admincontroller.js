const Customer = require("../models/Customer")
const Admin = require("../models/Admin")
const Seller = require("../models/Seller")
const nodemailer = require('nodemailer');
const SellerApplicant = require('../models/SellerApplicant');

 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await customer.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   const addseller = async (request, response) => {
    try 
    {
      const input = request.body;
      const seller = new Seller(input);
      await seller.save();
      response.send('Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };
  const viewsellers = async (request, response) => 
  {
     try 
     {
       const sellers = await Seller.find();
       if(sellers.length==0)
       {
         response.send("DATA NOT FOUND");
       }
       else
       {
         response.json(sellers);
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   const deleteseller = async (request, response) => 
 {
    try 
    {
      const uname = request.params.username
      const seller = await Seller.findOne({"username":uname})
      if(seller!=null)
      {
        await Seller.deleteOne({"username":uname})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Username Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const viewsellerapplicants = async (request, response) => {
    try {
      
        const sellerApplicants = await SellerApplicant.find();

        if (sellerApplicants.length === 0) {
            return response.status(200).send("No seller applicants found");
        } else {
            response.json(sellerApplicants);
        }
    } catch (error) {
        response.status(500).send(error.message);
    }
};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'petspaw0516@gmail.com', 
        pass: 'qugc pkzo zoai lrku' 
    }
});

const sendEmailSuccess = (recipient, username, password) => {
  const mailOptions = {
      from: '"Pets Paw" <petspaw0516@gmail.com>',
      to: recipient,
      subject: 'Congratulations on Your Seller Application',
      text: `Hello,\n\nYour seller application has been accepted. Your username is: ${username} and your password is: ${password}. We recommend you to please change the password for security reasons by going to the profile section in the navigation bar and updating your profile. Congratulations!\n\nBest regards,\nPets Paw`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};

const sendEmailRejection = (recipient, message) => {
  const mailOptions = {
      from: '"Pets Paw" <petspaw0516@gmail.com>',
      to: recipient,
      subject: 'Regarding Your Seller Application',
      text: `Hello,\n\nWe regret to inform you that your seller application has been rejected. ${message}.\n\nBest regards,\nPets Paw`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      } else {
          console.log('Email sent:', info.response);
      }
  });
};

const changesellerstatus = async (request, response) => {
  try {
    const { email, status, rejectionMessage } = request.body;

    if (!email || !status) {
      return response.status(400).send('Email and status are required');
    }

    const updatedApplicant = await SellerApplicant.findOneAndUpdate(
      { email: email },
      { $set: { status: status, rejectionMessage: rejectionMessage } }, 
      { new: true }
    );

    if (!updatedApplicant) {
      return response.status(404).send('Seller applicant not found');
    }

    if (status === 'accepted') {
      const newSeller = new Seller({
        fullname: updatedApplicant.fullname,
        gender: updatedApplicant.gender,
        dateofbirth: updatedApplicant.dateofbirth,
        company: updatedApplicant.company,
        username: updatedApplicant.username,
        email: updatedApplicant.email,
        password: updatedApplicant.password,
        address: updatedApplicant.address,
        contact: updatedApplicant.contact,
      });

      await newSeller.save();

      sendEmailSuccess(updatedApplicant.email, updatedApplicant.username, updatedApplicant.password);
    } else if (status === 'rejected') {
      sendEmailRejection(updatedApplicant.email, rejectionMessage); 
    }

    response.status(200).send('Seller Status Updated Successfully');
  } catch (error) {
    console.error('Error updating seller status:', error);
    response.status(500).send(error.message);
  }
};



  module.exports = {viewcustomers,deletecustomer,checkadminlogin,addseller,viewsellers,deleteseller,viewsellerapplicants,changesellerstatus}