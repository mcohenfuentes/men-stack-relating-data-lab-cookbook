const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
     
      const allUsers = await User.find();
      console.log(allUsers)
   
      res.render('users/index.ejs', {
        users: allUsers,
      });
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/');
    }
  });



module.exports = router;