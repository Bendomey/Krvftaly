
class DashboardController{
    static index(req, res){
        res.render('Dashboard/index',{
            title:'Dashboard'
        });
    }

    static login(req, res){
        res.render('Dashboard/Auth/login',{
            title:'Login'
        });
    }

    static signup(req, res){
        res.render('Dashboard/Auth/signup',{
            title:'Signup'
        });
    }

    static contact(req, res){
        res.render('Dashboard/contact',{
            title:'Contact'
        });
    }
}

export default DashboardController;