const express = require('express');
const passport = require("passport");
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

router.get('/',
  passport.authenticate('microsoft', {
    prompt: 'select_account',
    session:false,
  }));

router.get('/callback',
passport.authenticate('microsoft', { failureRedirect: '/auth/microsoft',session:false, }),
function (req, res) {
  const userString = JSON.stringify(req.user)
    const payload = {
        user: {
            id: req.user.id,
        }
    };
  res.send(`<!DOCTYPE html>
  <html lang="en">
    <body>
    <script>
      window.opener.postMessage(${userString}, 'http://localhost:3000')
    </script>
  </html>`)
  // Successful authentication, redirect home.
//   res.json(req.user)
    
  res.redirect('/');
})

router.post("/login", async (req, res) => {
    const {name, userID} = req.body;
    let user = new userModel(
        {name, userID}
    );
    await user.save();

    const payload = {
        user: {
            id: userID,
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;

        console.log(token)
            res.json({ token });
        }
    );
});
module.exports = router;

