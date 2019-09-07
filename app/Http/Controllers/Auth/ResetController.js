import models from '../../../Models';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mail from '../../../Config/Mail';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;
//models
const User = models.User;

class ResetController{
    static index(req, res){
        res.render('Dashboard/Auth/forgot',{
            title:'Forgot Password'
        });
    }

    static async send_forgot_mail(req, res){
        let user = await User.findOne({
            where:{
                email:req.body.email
            }
        });
        if(!user){
            req.flash('success_msg', 'A password reset has been sent successfully');
            res.redirect('/admin/login');
        }
           //set reset tokens and expiry
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
		user.resetPasswordExpires = Date.now() + 3600000; //one hour validity
		await user.save();
		//send email to user
		const resetURL = `http://${req.headers.host}/admin/account/reset/${user.resetPasswordToken}`;
        // await mail.send({
			// user,
			// subject:'Password Reset Link - PeersTronix',
			// resetURL,
			// filename:'reset_password'
        // });	
        req.flash('success_msg',`You have been mailed a password reset link ${resetURL}`);
		res.redirect('/admin/login');
    }

    static async reset(req, res){
        let user = await User.findOne({
            where:{
                resetPasswordToken:req.params.token,
				resetPasswordExpires:{
					[Op.gt]:Date.now()
				}
            }
        });

        if(!user){
			req.flash('error_msg','Password reset token is invalid or has expired');
			return res.redirect('/admin/login');
		}

		res.render('Dashboard/Auth/reset_password',{
			title:'Reset Password'
		});
    }
    
    static validate_passwords(req, res, next){
		req.checkBody('password','New Password field is empty').notEmpty();
		req.checkBody('password2','Confirm Password field is empty').notEmpty();
		req.checkBody('password2','Oops, your passwords do not match').equals(req.body.password);

		let errors = req.validationErrors();
		if(errors){
			req.flash('error_msg',errors.map(err => err.msg));
			res.redirect('back');
			return;
		}
		next();
    }
    
    static update(req, res){
		User.findOne({
            where:{
                resetPasswordToken:req.params.token,
				resetPasswordExpires:{
					[Op.gt]:Date.now()
				}
            }
        })
		.then(user => {
			user.resetPasswordToken = null;
			user.resetPasswordExpires = null;
			user.password = req.body.password;
			user.updatedAt = Date.now();
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					if(err) throw err;
					user.password = hash;
					user
						.save()
						.then(user => {
							req.flash('success_msg','Your password has been reset successfully');
							return res.redirect('/admin/login');
						})
						.catch(err => console.log(err));
				});
			});
		})
	}	

}

export default ResetController;