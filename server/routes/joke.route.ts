import { Router } from 'express'
import * as JokeController from '../controllers/joke.controller';

const Joke = Router();

Joke.get('/', JokeController.getJokes);
Joke.get('/:id', JokeController.getJokeByID);


export default Joke;