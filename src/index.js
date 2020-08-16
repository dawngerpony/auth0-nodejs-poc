const express = require('express');
const { createServer } = require('https');
const { readFileSync } = require('fs');
const { auth, requiresAuth } = require('express-openid-connect');

require('dotenv').config();

const config = {
  required: false,
  auth0Logout: true,
  baseURL: 'https://localhost:3000',
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,
  appSession: {
    secret: process.env.APP_SESSION_SECRET,
  },
};

const key = readFileSync('./localhost-key.pem');
const cert = readFileSync('./localhost.pem');

const app = express();

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
  // res.send(JSON.stringify(req.openid));
});

createServer({ key, cert }, app).listen('3000', () => {
  console.log('Listening on https://localhost:3000');
});
