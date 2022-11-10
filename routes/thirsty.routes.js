const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const Beer = require('../models/Beer.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');
const Restaurant = require('../models/Restaurant.model');




router.get('/restaurants', isLoggedIn, async (req, res, next) => {

    try {
        const restaurants = await Restaurant.find();

        res.render('restaurant/restaurant-list', { restaurants })

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/restaurants/details/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;
    const currentUser  = req.session.currentUser;
    let isFav;

    try {
    const thisUser = await User.findById(currentUser._id);

    if(thisUser.favSpot.includes(`${id}`)) {
        isFav = true;
    } 

    const restaurant = await Restaurant.findById(id)
    .populate('beerId');

    const allBeers = await Beer.find();

    res.render('restaurant/restaurant-details', { restaurant,  allBeers, isFav } );
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/restaurants/addFavs/:id', isLoggedIn, async (req, res, next) => {
    
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;

    try {
        const favouriteRestaurant = await User.findByIdAndUpdate(currentUser, { $push: { favSpot: id }});

        res.redirect(`/restaurants/details/${id}`);

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/restaurants/removeFavs/:id', isLoggedIn, async (req, res, next) => {
    
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;

    try {
        const favouriteRestaurant = await User.findByIdAndUpdate(currentUser, { $pull: { favSpot: id }});
        
        res.redirect(`/restaurants/details/${id}`);

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/restaurants/details/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    const user = req.session.currentUser;
    const { restaurantId } = req.body;

    try {         
        const beerUpdate = await Beer.findByIdAndUpdate(id, { $push: { restaurantId: restaurantId }});
        const restaurantUpdate = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { beerId: id }});
        const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: restaurantId }});
        const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: id }});
        
        res.redirect(`/beers/details/${id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/restaurants/create', isLoggedIn, async (req, res, next) => {
    
    try {
        const beers = await Beer.find();
        
        res.render('restaurant/restaurant-create', {beers});

    } catch (error) {
        console.log(error);
        next(error);
    }

});


router.post('/restaurants/create', fileUploader.single('image'), async (req, res, next) => {
    
    const { name, location, rating, beerId } = req.body;
    

    try {
        const currentUser = req.session.currentUser._id;
        let image;

        if(req.file){

            image = req.file.path

        }  else {
            image = 'https://i.ibb.co/zxRZ9FC/pub-5537449-1280.jpg';
        }

            const createdRestaurant = await Restaurant.create({ name, location, rating });
            const newRestaurantId = createdRestaurant._id
          
            const restaurantUpdate = await Restaurant.findByIdAndUpdate(newRestaurantId, { $push: { beerId: beerId }});
            const beerUpdate = await Beer.findByIdAndUpdate(beerId, { $push: { restaurantId: newRestaurantId }});
            const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: beerId }});
            const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: newRestaurantId }});
          
            res.redirect(`/restaurants/details/${newRestaurantId}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers', isLoggedIn, async (req, res, next) => {

    try {
        const beers = await Beer.find();

        res.render('beer/beer-list', { beers });

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers/details/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;
    const currentUser = req.session.currentUser;
    let isFav;

    try {
    const thisUser = await User.findById(currentUser._id);

    if(thisUser.favBeers.includes(`${id}`)) {
        isFav = true;
    } 

    const beer = await Beer.findById(id)
    .populate('restaurantId');

    const allRestaurants = await Restaurant.find();

    res.render('beer/beer-details', { beer,  allRestaurants, isFav } );
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/beers/addFavs/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    try {
        console.log(id)
        const favouriteBeer = await User.findByIdAndUpdate(currentUser, { $push: { favBeers: id }});
        res.redirect(`/beers/details/${id}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/beers/removeFavs/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    try {
        const favouriteBeer = await User.findByIdAndUpdate(currentUser, { $pull: { favBeers: id }});
        res.redirect(`/beers/details/${id}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/beers/details/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    const user = req.session.currentUser;
    const { restaurantId } = req.body;

    try { 
        const beerUpdate = await Beer.findByIdAndUpdate(id, { $push: { restaurantId: restaurantId }});
        const restaurantUpdate = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { beerId: id }});
        const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: restaurantId }});
        const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: id }});
        
        res.redirect(`/beers/details/${id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers/create', isLoggedIn, async (req, res, next) => {
    
    try {
        const restaurants = await Restaurant.find();
        
        res.render('beer/beer-create', {restaurants});

    } catch (error) {
        console.log(error);
        next(error);
    }

});


router.post('/beers/create', fileUploader.single('imageUrl'), async (req, res, next) => {
    
    const { name, style, brewery, description, quantity, abv, brand, restaurantId } = req.body;

    try {
        const currentUser = req.session.currentUser._id;
        let imageUrl;

        if(req.file){

            imageUrl = req.file.path

        } else {
            imageUrl = 'https://static-verticommnetwork1.netdna-ssl.com/img/products/default-2061-full.png';
        }

            const createdBeer = await Beer.create({ name, style, imageUrl, brewery, description, quantity, abv, brand });
            const newBeerId = createdBeer._id
          
            const beerUpdate = await Beer.findByIdAndUpdate(newBeerId, { $push: { restaurantId: restaurantId }});
            const restaurantUpdate = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { beerId: newBeerId }});
            const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: restaurantId }});
            const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: newBeerId }});
          
            res.redirect(`/beers/details/${newBeerId}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/private/profile', isLoggedIn, async (req, res, next) => {
    
    try {
        const currentUser = req.session.currentUser._id;

        const user = await User.findById(currentUser)
        .populate('favBeers')
        .populate('favSpot')
        
        res.render('profile/profile', { user }); 

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/private/profile/edit/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.render('profile/profile-edit', user);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/private/profile/edit/:id', isLoggedIn, async (req, res, next) => {

    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email });

        res.redirect('/private/profile');
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/search/', isLoggedIn, async (req, res, next) => {

    //const { term } = req.params;
    const currentUser = req.session.currentUser;
    const { name, style, brewery, brand} = req.query;

    try {
        const searchBeers = await Beer.find(
            {$or: 
                [{'name': name }
                /* {'style': style},
                {'brewery': brewery},
                {'brand': brand}, */
            ]});
        
        console.log(searchBeers);

        res.render('search', { searchBeers, currentUser });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/private/profile/delete/:id', isLoggedIn, async (req, res, next) => {
    
    const { id } = req.params;

    try {
        await User.findByIdAndRemove(id);


        res.redirect('/logout');
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});



module.exports = router;