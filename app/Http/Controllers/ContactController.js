import Models from '../../Models';
const Contact = Models.Contact;
const Newsletter = Models.Newsletter;

class ContactController{
    static async index(req, res){
        let contacts = await Contact.findAll({
            order:[
                ['attended','ASC'],
                ['createdAt','DESC']
            ]
        });
        res.render('Dashboard/contact',{
            title:"Contacts",
            contacts
        });
    }

    static async send_request(req, res){
        await Contact.create(req.body);
        req.flash('success_msg', 'Your request was succesfully sent');
        res.redirect('back');
    }


    static async attend(req, res){
        await Contact.update({
            attended:'1',
            updatedAt:Date.now
        },{
            where:{
                id:req.body.id
            }
        }); 
        req.flash('success_msg','Your request has been attended to');
        res.redirect('back'); 
    }

    static async destroy(req, res){
        await Contact.destroy({
            where:{
                id:req.body.id
            }
        });
        req.flash('success_msg', 'Your request was succesfully deleted');
        res.redirect('back');
    }

    static async newsletter(req, res){
        await Newsletter.create(req.body);
        //send mail for welcomming them
        res.json(true);
    }

}

export default ContactController;