const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require('../config/cloudinary.config');

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
    const currentUser  = req.session.currentUser;
    let isFav;

    try {
        if(currentUser.favSpot.includes('id')) {
            isFav = true;
        } else {
            isFav = false;
        }

        const restaurant = await Restaurant.findById(id);

        res.render('restaurant/restaurant-details', restaurant, isFav);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/restaurants/details/:id', async (req, res, next) => {

    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    const user = req.session.currentUser;
    //let isFav;

    try {
        /* console.log(user);
        console.log(currentUser); */

        if(user.favSpot.includes('id')) {
            const favouriteRestaurant = await User.findByIdAndUpdate(currentUser, { $pull: { favSpot: id }});
            //isFav = false;

        } else {
            const favouriteRestaurant = await User.findByIdAndUpdate(currentUser, { $push: { favSpot: id }});
            //isFav = false;
        }


        res.redirect(`/restaurants/details/${id}`);
        
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
    const currentUser = req.session.currentUser;
    let isFav;
    console.log(currentUser.favBeers.includes('id'));

    try {
        if(currentUser.favBeers.includes('id')) {
            isFav = true;
        } else {
            isFav = false;
        }

        const beer = await Beer.findById(id);

        res.render('beer/beer-details', beer, isFav );
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/beers/details/:id', async (req, res, next) => {

    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    const user = req.session.currentUser;
    //let isFav;

    try {
        console.log(user);
        console.log(currentUser);

        if(user.favBeers.includes('id')) {
            const favouriteBeer = await User.findByIdAndUpdate(currentUser, { $pull: { favBeers: id }});
            //isFav = false;

        } else {
            const favouriteBeer = await User.findByIdAndUpdate(currentUser, { $push: { favBeers: id }});
            //isFav = false;
        }

        res.redirect(`/beers/details/${id}`);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/beers/create', async (req, res, next) => {
    
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
            
          /* else {
            const createdBeer = await Beer.create({ name, style, brewery, description, quantity, abv, brand});
            const newBeerId = createdBeer._id
            
             console.log(newBeerId)
            console.log(restaurantId)
            console.log(currentUser)

            const beerUpdate = await Beer.findByIdAndUpdate(newBeerId, { $push: { restaurantId: restaurantId }});
            const restaurantUpdate = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { beerId: newBeerId }});
            const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: restaurantId }});
            const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: newBeerId }});

            res.redirect(`/beers/details/${newBeerId}`);
        
       
 
        const beerUpdate = await Beer.findByIdAndUpdate(createdBeer._id, { $push: { restaurantId: idRest }});

        const restaurantUpdate = await Restaurant.findByIdAndUpdate(idRest, { $push: { beerId: createdBeer._id }});

        const restaurantUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { restaurantId: idRest }});

        const beerUpdateUser = await User.findByIdAndUpdate(currentUser, { $push: { beerId: createdBeer._id }});

        res.redirect(`/beer/details/${createdBeer._id}`);
    
        res.redirect(`/`); */
        
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
        
        res.render('profile/profile', { user }); 

    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/private/profile/edit/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.render('profile/profile-edit', user);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.post('/private/profile/edit/:id', async (req, res, next) => {

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


module.exports = router;