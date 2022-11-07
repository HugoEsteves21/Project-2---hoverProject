const router = require("express").Router();
const mongoose = require("mongoose");

const Beer = require('../models/Beer.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
const Restaurant = require('../models/Restaurant.model');



router.get('/restaurants', async (req, res, next) => {

    try {
        const restaurants = await Restaurant.find();

        res.render('restaurant/restaurant-list', { restaurants })

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/restaurants/details/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findById(id);

        res.render('restaurant/restaurant-details', restaurant)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers', async (req, res, next) => {

    try {
        const beers = await Beer.find();

        res.render('beer/beer-list', { beers })

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers/details/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
        const beer = await Beer.findById(id);

        res.render('beer/beer-details', beer)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beer/create', async (req, res, next) => res.render('beer/beer-create'));


router.post('/beer/create', async (req, res, next) => {
    const { name, imageUrl, style, brewery, description, quantity, abv, brand, restaurantId } = req.body;

    try {
        const createdBeer = await Beer.create({ name, imageUrl, style, brewery, description, quantity, abv, brand, restaurantId });

        res.redirect(`/beer/details/${createdBeer._id}`)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})




router.get('/private/profile', (req, res, next) => res.render())

module.exports = router;