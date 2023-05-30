const mongoose = require("mongoose");

// Define a schema for the car model
const carSchema = new mongoose.Schema({
    make: String,
    year: Number,
    budget: Number,
    contact: String,
  });
  
  // Create a car model based on the schema
module.exports = mongoose.model("Car", carSchema, "Car");