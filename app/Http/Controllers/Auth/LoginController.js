
class LoginController{
    static index(req, res){
        res.render('Dashboard/Auth/login',{
            title:'Login'
        });
    }

    static rememberMe(req, res, next){
        if(req.body.remember){
            req.session.cookie.maxAge = 30 * 24 * 60 * 1000; //cookie expires after 30 days
        }else{
            req.session.cookie.expires = false; // cookie expires at the end of the session
        }
        next();
    }

    static login_redirect(req, res){
        let path = req.session.redirect_to;
        delete req.session.redirect_to;
        res.redirect(path || '/dashboard');
    }

    static logout(req, res){
        req.logout();
        res.redirect('/admin/login');
    }
}

export default LoginController;