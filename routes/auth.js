import express from 'express';
const Route = express.Router();

import HomeController from '../app/Http/Controllers/HomeController';

Route.get('/login', HomeController.login);
Route.get('/signup', HomeController.signup);


export default Route;