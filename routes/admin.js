import express from 'express';
import passport from 'passport';
const Route = express.Router();

import DashboardController from '../app/Http/Controllers/DashboardController';
import RegisterController from '../app/Http/Controllers/Auth/RegisterController';
import LoginController from '../app/Http/Controllers/Auth/LoginController';
import ResetController from '../app/Http/Controllers/Auth/ResetController';
import ErrorHandler from '../app/Config/ErrorHandlers';
import Middleware from '../app/Config/middleware';

//register
Route.get('/signup', RegisterController.index);
Route.post(
    '/signup',
    RegisterController.validate_user,
    RegisterController.register    
);

//login
Route.get('/login', LoginController.index);
Route.post(
    '/login',
    LoginController.rememberMe,
    passport.authenticate('local',{
        failureRedirect:'/admin/login',
        failureFlash:true
    }),
    LoginController.login_redirect
);
Route.get('/logout', LoginController.logout);

//reset
Route.get(
    '/account/forgot_password',
    Middleware.forwardAuthenticated,
    ResetController.index
);
Route.post(
    '/account/forgot_password',
    ErrorHandler.catchErrors(ResetController.send_forgot_mail)
);

Route.get(
    '/account/reset/:token',
    ErrorHandler.catchErrors(ResetController.reset)
);
Route.post(
    '/account/reset/:token',
    ResetController.validate_passwords,
    ResetController.update
);



export default Route;