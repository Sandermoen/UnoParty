const express = require('express');
const apiRouter = express.Router();
const User = require('../models/User');

apiRouter.get('/', (req, res) => {
  res.send('hello');
});

apiRouter.post('/auth', async (req, res, next) => {
  const { username } = req.body;
  if (!username)
    return res.status(400).send('Please provide a username and try again');
  if (username.length > 10) {
    return res
      .status(400)
      .send('Please choose a username shorter than 10 characters');
  }
  if (username.length <= 3) {
    return res
      .status(400)
      .send('Please choose a username that is longer than 3 characters');
  }
  await User.findOne({ username: username }, (err, user) => {
    if (err) return next(err);
    if (user)
      return res
        .status(401)
        .send(
          'A user with that username is already playing please use another one'
        );
    res.send({ status: 'success' });
  });
});

module.exports = apiRouter;
