const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
     
      const currentUser = await User.findById(req.session.user._id);
   
      res.render('foods/index.ejs', {
        foods: currentUser.foods,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });

  router.post('/', async (req, res) => {
    try {
     
      const currentUser = await User.findById(req.session.user._id);
      
      currentUser.foods.push(req.body);
      
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {

      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:foodId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Find the application by the applicationId supplied from req.params
      const food = currentUser.foods.id(req.params.foodId);
      // Render the show view, passing the application data in the context object
      res.render('foods/show.ejs', {
        food: food,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.delete('/:foodId', async (req, res) => {
    try {
      // Look up the user from req.session
      const currentUser = await User.findById(req.session.user._id);
      // Use the Mongoose .deleteOne() method to delete
      // an application using the id supplied from req.params
      currentUser.foods.id(req.params.foodId).deleteOne();
      // Save changes to the user
      await currentUser.save();
      // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:foodId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.foods.id(req.params.foodId);
      res.render('foods/edit.ejs', {
        food: food,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.put('/:foodId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.foods.id(req.params.foodId);
      food.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/foods/${req.params.foodId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;