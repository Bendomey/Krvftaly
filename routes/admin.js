import express from 'express';
const Route = express.Router();

import DashboardController from '../app/Http/Controllers/DashboardController';

Route.get('/login', DashboardController.login);
Route.get('/signup', DashboardController.signup);

export default Route;