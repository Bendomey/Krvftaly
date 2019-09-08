import Models from '../../Models';
import Jimp from 'jimp';
import uuid from 'uuid';
import fs from 'fs';

//models
const Product = Models.Product;
const Category = Models.Category;

class ProductController{
    static async index(req, res){
        let categories = await Category.findAll({
            order:[
                ['name','ASC']
            ]
        });
        res.render('Dashboard/add_product',{
            title:'Add Product',
            categories
        });
    }

    static async sanitize_body(req, res, next){
        req.checkBody('name','Product Name field cannot be empty').notEmpty();
        req.checkBody('short_description','Product Short Description field cannot be empty').notEmpty();
        req.checkBody('description','Product Name field cannot be empty').notEmpty();
        let errors = req.validationErrors();
        if(errors){
            let categories = await Category.findAll({
                orderBy:[
                    ['name','ASC']
                ]
            });
            res.render('Dashboard/add_product',{
                errors,
                categories,
                title:'Add Product'
            });
        }
        next();
    }

    static sanitize_info(req, res, next){
        let information = [];
        req.body.information.forEach(info => {
            if(info.attribute.trim() !== "" && info.attribute.trim() !== ""){
                information.push(info);
            }
        });
        req.body.information = [...information];
        next();
    }


    static async resize_images(req, res, next){
        if(!req.files){
            next();
            return;
        }
        //rename them
        let name = [];
        req.files.map((file, index) => {
            name.push(uuid.v4() + "." +(file.mimetype.split('/')[1]));
        });
        req.body.pics = [...name];

        for(let i = 0; i < req.files.length; i++){
            req.files[i] = await Jimp.read(req.files[i].buffer);
            //resizing 'em
            await req.files[i].resize(800, Jimp.AUTO);
            //save 'em
            await req.files[i].write(`./public/uploads/product/${req.body.pics[i]}`)
        }

        next();
    }

    static async add(req, res){
        const { name, price, category, rating, short_description, description, information, pics } = req.body;
        let product = new Product({
            name,
            price,
            categoryId:category,
            rating,
            short_description,
            description,
            information:JSON.stringify(information),
            pics:JSON.stringify(pics)
        });
        await product.save();
        //redirect back
        req.flash('success_msg', `Congratulations, ${name} has been successfully uploaded`);
        res.redirect('back');
    }


    static async view(req, res){
        let products = await Product.findAll({
            orderBy:[
                ['name','ASC']
            ],
            include:[Category]
        });
        res.render('Dashboard/view_product',{
            title:'Products',
            products
        });
    }

    static async destroy(req, res){
        let product = await Product.findOne({
            where:{
                id:req.body.id
            }
        });
        let name = product.name;
        let files = JSON.parse(product.pics);
        files.map(file => {
            fs.unlink(`./public/uploads/product/${file}`, err => {
                if(err) throw err;
            });
        });
        await product.destroy();
        req.flash('success_msg',`Congratulations, you have removed ${name} from your product list`);
        res.redirect('back');
    }

    static async edit_product_view(req, res){
        let productPromise = Product.findOne({
            where:{
                id:req.params.id
            },
            include:[Category]
        });
        let categoryPromise = Category.findAll({
            orderBy:[
                ['name','ASC']
            ]
        });
        let [product, categories] = await Promise.all([productPromise, categoryPromise]);
        res.render('Dashboard/edit_product',{
            title:'Update Product',
            product,
            categories
        });
    }
}

export default ProductController;