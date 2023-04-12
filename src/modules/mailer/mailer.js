import nodemailer from 'nodemailer'
import {mailUser, mailPass} from '../../config.js';

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
              user: mailUser,
              pass: mailPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
    }

	sendEmail = async (toEmail, recoveryLink)  => {
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Restablecer contraseña",
            html: `<div>
				<h1>Restablecer contraseña</h1>
				<p>Para restablecer la contraseña haz click en el enlace: ${recoveryLink}</p>
			</div>`,
			attachments: []
		});
	}
} 