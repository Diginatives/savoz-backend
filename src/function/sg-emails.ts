const jade = require('pug');

const sgMail = require('@sendgrid/mail');

export const TESTING_TEMPLATE = 'src/views/mail-templates/testing.pug';
export const RESET_PASSWORD_TEMPLATE = 'src/views/mail-templates/forgot-password-link.pug';
export const RESET_PASSWORD_CONFIRM_TEMPLATE =
  'src/views/mail-templates/reset-password-confirm.pug';
export const ADMIN_USER_CREATION_TEMPLATE = 'src/views/mail-templates/admin-user-creation.pug';

export async function sendEmail(
  email: string,
  template: any,
  subject: string,
  htmlTemplate: string,
  token?: string,
  data?: any,
) {
  if (!email || email == undefined) return '';
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: 'najam.bashir@tkxel.io',
    subject: subject,
    text: 'Savoz',
    html: jade.renderFile(htmlTemplate, { template: template, token: token, data: data }),
  };
  try {
    await sgMail.send(msg);
    return '';
  } catch (error: any) {
    if (error.response) {
      return error.response.body;
    }
  }
}
