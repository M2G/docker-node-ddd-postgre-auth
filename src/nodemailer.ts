import type { NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

const email = process.env.MAILER_EMAIL_ID ?? 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD ?? 'auth_email_pass';

const testAccount: any = nodemailer.createTestAccount();

const smtpTransport: any = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
  service: process.env.MAILER_SERVICE_PROVIDER ?? 'Gmail',
});

const handlebarsOptions: NodemailerExpressHandlebarsOptions = {
  extName: '.html',
  // viewEngine: 'handlebars',
  viewPath: `${__dirname}/templates/`,
} as any;

smtpTransport.use('compile', hbs(handlebarsOptions));

export default smtpTransport;
