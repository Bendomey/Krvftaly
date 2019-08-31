
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
}

export default DashboardController;