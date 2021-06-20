import jokeRoute from './routes/joke.route';
import express from 'express';

const APP = express();
const PORT = 9000;

// Films routes
APP.use('/jokes', jokeRoute);

// Add 404 Page
APP.get('*', (req, res) => {
  res.status(404).send({
    message: "Chuck Norris forbides you!"
  });
});

APP.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
})
