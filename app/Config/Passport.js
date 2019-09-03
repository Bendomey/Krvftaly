import bcrypt from 'bcryptjs';
import Models from '../Models';
const User = Models.User;
const LocalStragtegy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.use(
		new LocalStragtegy({usernameField:'email'},(email, password, done) => {
			//Match User
			User.findOne({
				where: {
					email:email
				}
			})
			.then(user => {
				if(!user){
					return done(null, false, { message:'That email is not registered' });
				}

			  // Match password
			  bcrypt.compare(password, user.password, (err, isMatch) => {
				  if (err) throw err;
				  if(isMatch){
					  
					  return done(null, user);
				  }else{
					  return done(null,false, { message: 'Password incorrect' });
				  }
			  });
			}).catch(err => { throw err });
		})
	);

	passport.serializeUser(function(user, done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findByPk(id).then((user)=>{
			
			if(user){
				done(null, user);
			}else{
				done(err,null);
			}
		});
	});
}
