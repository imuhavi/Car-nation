const express = require('express');
const bodyParser = require('body-parser');
const Car = require('../models/CarModel');

const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'carnationautomart.com', // Replace with your SMTP server host
  port: 587, // Replace with the appropriate port number
  secure: false, // Set to true if using a secure connection (TLS/SSL)
  auth: {
    user: 'info@carnationautomart.com', // Replace with your email address
    pass: 'ztoo-lqmz-lgxi-cais' // Replace with your email password or app-specific password
  }
});

// Create the email message
const mailOptions = {
  from: 'info@carnationautomart.com', // Replace with your email address
  to: 'davisbwaley481@gmail.com', // Replace with the recipient's email address
  subject: 'Test Email', // Replace with the subject of your email
  text: 'Hello, this is a test email.' // Replace with the plain text content of your email
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent:', info.response);
  }
});

// Middleware to parse request bodies
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Define a route to handle form submissions
router.post('/', (req, res) => {
  // Create a new car object with the submitted form data
  const newCar = new Car({
    make: req.body.make,
    year: req.body.year,
    budget: req.body.budget,
    contact: req.body.contact,
  });

  // Save the new car object to the database
  newCar.save((err, savedCar) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving car to database.');
    } else {
      res.send('Car saved to database: ' + savedCar);
    }
  });
});

module.exports = router;
