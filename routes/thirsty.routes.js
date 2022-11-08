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


router.post('/restaurants/details/:id', async (req, res, next) => {

    const { id } = req.params;
    const { currentUser } = req.session.currentUser;

    try {
        //const restaurant = await Restaurant.findById(id);

        const favouriteRestaurant = await User.findByIdAndUpdate(currentUser, { $push: { favSpot: id }});

        res.redirect(`/restaurants/details/${_id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers', async (req, res, next) => {

    try {
        const beers = await Beer.find();

        res.render('beer/beer-list', { beers });

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


router.post('/beers/details/:id', async (req, res, next) => {

    const { id } = req.params;
    const currentUser  = req.session.currentUser._id;

    try {
        //const beer = await Beer.findById(id);
  
        const favouriteBeer = await User.findByIdAndUpdate(currentUser, { $push: { favBeers: id }});

        res.redirect(`/beers/details/${id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers/create', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        console.log(restaurants.name)
        res.render('beer/beer-create', {restaurants})
    } catch (error) {
        console.log(error);
        next(error);
    }

});


router.post('/beers/create', async (req, res, next) => {
    
    const { name, imageUrl, style, brewery, description, quantity, abv, brand } = req.body;

    try {
        const { currentUser } = req.session.currentUser;

        const createdBeer = await Beer.create({ name, imageUrl, style, brewery, description, quantity, abv, brand });

        const idRest = document.getElementsByName('restaurants').value;

        const beerUpdate = await Beer.findByIdAndUpdate(createdBeer._id, { $push: { restaurantId: idRest }});

        const restaurantUpdate = await Restaurant.findByIdAndUpdate(idRest, { $push: { beerId: createdBeer._id }});

        const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: idRest }});

        const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: createdBeer._id }});

        res.redirect(`/beers/details/${createdBeer._id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/private/profile', async (req, res, next) => {
    
    try {
        const currentUser = req.session.currentUser._id;

        const user = await User.findById(currentUser)
        .populate('favBeers')
        .populate('favSpot')

        
console.log(user)

       res.render('profile/profile', { user }); 

    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;