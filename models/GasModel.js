const mongoose = require('mongoose');

// Define the gas schema
const gasModelSchema = new mongoose.Schema({
  imagePath: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  carType: {
    type: String,
    enum: [
      'sedan',
      'suv',
      'hatchback',
      'coupe',
      'convertible',
      'wagon',
      'pickup-truck',
      'van',
      'electric',
      'hybrid',
      'luxury',
      'sports',
      'compact',
      'mid-size',
      'full-size',
      'crossover',
      'off-road'
    ],
    required: true
  },
  year: {
    type: Number
  },
  price: {
    type: Number
  },
  mileage: {
    type: String
  },
  cc: {
    type: Number
  },
  gearbox: {
    type: String,
    enum: [
      'manual',
      'automatic',
      'cvt',
      'dct',
      'smt',
      'amt',
      'hybrid'
    ]
  },
  colour: {
    type: String,
    enum: [
      'red',
      'blue',
      'green',
      'yellow',
      'black',
      'white'
    ]
  },
  interior: {
    type: String,
    enum: [
      'leather',
      'cloth',
      'suede',
      'alcantara',
      'synthetic'
    ]
  },
  body: {
    type: String,
    enum: [
      'sedan',
      'hatchback',
      'SUV',
      'crossover',
      'coupe',
      'convertible',
      'pickup',
      'van',
      'wagon',
      'sports',
      'luxury'
    ]
  },
  drivetrain: {
    type: String,
    enum: [
      '2wd',
      '4wd',
      'awd',
      'fwd',
      'rwd'
    ]
  },
  wheel: {
    type: String,
    enum: [
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22'
    ]
  },
  description: {
    type: String
  },
  safety: {
    type: [String],
    enum: [
      'abs',
      'airbags',
      'traction-control',
      'stability-control',
      'blind-spot-monitoring',
      'lane-departure-warning',
      'forward-collision-warning'
    ]
  },
  technology: {
    type: [String],
    enum: [
      'gps',
      'bluetooth',
      'backup-camera',
      'blind-spot-monitoring',
      'lane-departure-warning',
      'adaptive-cruise-control',
      'android-auto',
      'apple-carplay',
      'wireless-charging',
      'keyless-entry',
      'push-button-start',
      'parking-assist',
      'head-up-display',
      'smartphone-integration',
      'voice-control'
    ]
  }
});

// Create the gas model


module.exports = mongoose.model("GasModel", gasModelSchema, "gasmodel");
