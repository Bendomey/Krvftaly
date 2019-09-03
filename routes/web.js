import express from 'express';
const Route = express.Router();

import HomeController from '../app/Http/Controllers/HomeController';
import DashboardController from '../app/Http/Controllers/DashboardController';
import Middleware from '../app/Config/middleware';

Route.get('/',HomeController.index);
Route.get('/contact', HomeController.contact);
Route.get('/about', HomeController.about);
Route.get('/blog', HomeController.blog);

//dashboard
Route.get('/dashboard', Middleware.ensureAuthenticated ,DashboardController.index);


export default Route;