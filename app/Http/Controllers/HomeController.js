
class HomeController {
    static index(req, res){
        res.render('Client/index',{
            title:"Welcome"
        });
    }

    static contact(req, res){
        res.render('Client/contact',{
            title:'Contact Us'
        });
    }
    
    static about(req, res){
        res.render('Client/about',{
            title:"About Us"
        });
    }

    static login(req, res){
        res.render('Client/Auth/login',{
            title:'Login'
        });
    }

    static signup(req, res){
        res.render('Client/Auth/signup',{
            title:'Signup'
        });
    }

    static blog(req, res){
        res.render('Client/blog',{
            title:'Blog Posts'
        })
    }
}

export default HomeController