import express from 'express';
const Route = express.Router();

import HomeController from '../app/Http/Controllers/HomeController';
import DashboardController from '../app/Http/Controllers/DashboardController';
import ContactController from '../app/Http/Controllers/ContactController';
import CategoryController from '../app/Http/Controllers/CategoryController';
import Middleware from '../app/Config/middleware';
import ErrorHandler from '../app/Config/ErrorHandlers';

Route.get('/',HomeController.index);
Route.get('/contact', HomeController.contact);
Route.get('/about', HomeController.about);
Route.get('/blog', HomeController.blog);
Route.post('/newsletter', ErrorHandler.catchErrors(ContactController.newsletter));
Route.post('/contacts', ErrorHandler.catchErrors(ContactController.send_request));

//dashboard
Route.get('/dashboard', Middleware.ensureAuthenticated , DashboardController.index);
Route.get('/dashboard/contact', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(ContactController.index));
Route.post('/dashboard/delete_contact', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(ContactController.destroy));
Route.get('/dashboard/categories/add', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(CategoryController.add));
Route.post('/dashboard/categories/add', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(CategoryController.addAction));
Route.get('/dashboard/categories/view', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(CategoryController.index));
Route.post('/dashboard/categories/delete_category', Middleware.ensureAuthenticated, ErrorHandler.catchErrors(CategoryController.destroy));

export default Route;