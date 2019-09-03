import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import ejs from 'ejs';

const Transport = nodemailer.createTransport({
	host:process.env.MAIL_HOST,
	port:process.env.MAIL_PORT,
	secure:true,
	auth:{
		user:process.env.MAIL_USER,
		pass:process.env.MAIL_PASS
	}
});

class Mail{
    static generateHTML(filename, options={}){
		const html = ejs.renderFile(`${__dirname}/../../resources/views/Mail/${filename}.ejs`, options);
		return html;
    }
    
    static async send(options){
		let html = await this.generateHTML(options.filename,options);
		let text = htmlToText.fromString(html);
		const mailOptions = {
			from:'PeersTronix <noreply@peerstronix.com>',
			to:options.user.email,
			subject:options.subject,
			html,
			text
		};
		return Transport.sendMail(mailOptions);
	}
}

export default Mail;