const express = require('express');
const passport = require("passport");
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const cors = require('cors')
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const port = 5000;
// const loginRouter = require('./routes/microsoftRoutes');

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
passport.use(new MicrosoftStrategy({
  clientID: 'baed669f-3d33-4f0e-b7bb-c522c4b3f23d',
  clientSecret: 'nkl8Q~6MDDszFn-ldxvaEOsXB~aVQaZdUAN24bou',
  callbackURL: "http://localhost:5000/auth/microsoft/callback",
  scope: ['user.read'],
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile)
  }
));
app.use('/api',require('./routes/userRoutes'));
app.use('/auth/microsoft', require('./routes/microsoftRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));