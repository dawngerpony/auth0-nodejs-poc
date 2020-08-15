const express = require('express');
const https = require('https');
const fs = require('fs');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

require('dotenv').config();

const config = {
  required: false,
  auth0Logout: true,
  baseURL: "https://localhost:3000",
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,
  appSessionSecret: process.env.APP_SESSION_SECRET
}

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

const app = express();

app.use(auth(config));

app.get("/", (req, res) => {
  res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
})


app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
  // res.send(JSON.stringify(req.openid));
});

https.createServer({ key, cert }, app).listen('3000', () => {
  console.log('Listening on https://localhost:3000');
})
