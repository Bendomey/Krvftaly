import Models from '../../Models';

//model
const Category = Models.Category;

class CategoryController{
    static async index(req, res){
        let categories = await Category.findAll();
        res.render('Dashboard/view_category',{
            title:'View Categories',
            categories
        });
    }

    static async add(req, res){
        res.render('Dashboard/add_category',{
            title:'Add Category'
        });
    }

    static async addAction(req, res){
        await Category.create(req.body);
        req.flash('success_msg', `Congratulations, you have successfully added ${req.body.name}`);
        res.redirect('back');
    }

    static async destroy(req, res){
        await Category.destroy({
            where:{
                id:req.body.id
            }
        });
        req.flash('sucess_msg','Congratulations, you successfully removed this category');
        res.redirect('back');
    }
}

export default CategoryController;