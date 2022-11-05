const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hoverProject';


const restaurants = [
    
];


async function seeds() {
    try {
      const x = await mongoose.connect(MONGO_URI);
      console.log(`Connected to: ${x.connections[0].name}`);
  
      const createdRestaurants = await Restaurant.create(restaurants);
  
      console.log(`Successfuly created ${createdRestaurants.length} restaurants`);
  
      x.disconnect();
    } catch (error) {
      console.log(error);
    }
  }
  
  seeds();