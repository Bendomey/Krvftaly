import express from 'express';
const Route = express.Router();

import HomeController from '../app/Http/Controllers/HomeController';
import DashboardController from '../app/Http/Controllers/DashboardController';

Route.get('/',HomeController.index);
Route.get('/contact', HomeController.contact);
Route.get('/about', HomeController.about);
Route.get('/blog', HomeController.blog);

//dashboard
Route.get('/dashboard', DashboardController.index);


export default Route;