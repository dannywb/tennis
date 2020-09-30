const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'admin@dwbsports.com',
    subject: `Welcome ${name} to the Sunday Tennis application`,
    text: 'Your user account will be validated by the site admin before you will get complete access. '
  })
}

const sendAccessEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'admin@dwbsports.com',
    subject: 'Access granted',
    text: 'Your user access has been granted by the administrator of this site. Please forward any suggestions or issues to admin@dwbsports.com. Enjoy!'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendAccessEmail
}