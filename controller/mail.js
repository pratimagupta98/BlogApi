
// // async..await is not allowed in global scope, must use a wrapper
// // exports.sendmail = async (req,res) =>{
// //   const {to,text,subject} = req.body
// //   // Generate test SMTP service account from ethereal.email
// //   // Only needed if you don't have a real mail account for testing
// //   let testAccount = await nodemailer.createTestAccount();

// //   // create reusable transporter object using the default SMTP transport
// //   let transporter = nodemailer.createTransport({
// //     host: "smtpout.secureserver.net",
// //     port: 993,
// //     secure: false, // true for 465, false for other ports
// //     auth: {
// //       user: "contactus@brahmaand.space", // generated ethereal user
// //       pass: "Br@hmaand@123", // generated ethereal password
// //     },
// //   });

// //   // send mail with defined transport object
// //   let info = await transporter.sendMail({
// //     from: 'contactus@brahmaand.space', // sender address
// //     to: to, // list of receivers
// //     subject: subject, // Subject line
// //     text: text, // plain text body
// //     html: `<b>${text}</b>`, // html body
// //   }).then((data)=>{
// //     res.status(200).json({
// //       status: true,
// //       data: data,
// //     });
// //   }).catch((error)=>{
// //     res.status(400).json({
// //       status: false,
// //       error: error,
// //     });
// //   });
// // console.log("INFO",info)
// //   console.log("Message sent: %s", info);
// //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// //   // Preview only available when sending through an Ethereal account
// //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// // }

// // main().catch(console.error);
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.

// const CLIENT_ID = '78813466355-slkfaq7juqkp22ho2dj12h5u2a26u9j8.apps.googleusercontent.com';
// const CLEINT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//04qvb03l1rrzjCgYIARAAGAQSNwF-L9Ir5MD_ZMQnBbV2nduYyq_bYNVCy2jLzBE7iIrLgZGnBr5bCVGWH6mYXJTT4JSMRGa9MKM';

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLEINT_SECRET,
//     REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// exports.sendmail = async (req,res) =>{
// async function sendMail() {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();

//         const transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: 'contactus@brahmaand.space',
//                 clientId: CLIENT_ID,
//                 clientSecret: CLEINT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken,
//             },
//         });
//         console.log("transport",transport)

//         const mailOptions = {
//             from: 'SENDER NAME <contactus@brahmaand.space>',
//             to: 'pratimadevelopersveltosest@gmail.com',
//             subject: 'Hello from gmail using API',
//             text: 'Hello from gmail email using API',
//             html: '<h1>Hello from gmail email using API</h1>',
//         };

//         const result =await transport.sendMail(mailOptions);
//         return result;
//     } catch (error) {
//         return error;
//     }
// }

// sendMail()
//     .then((result) => {
//         res.status(200).json({
//             status:true,
//             msg:"success",
//             data :result
//         })
//     }
//    // console.log('Email sent...', result)
//     )
//     .catch((error) => {
//         res.status(200).json({
//             status:false,
//             msg:"success",
//             data :error.message
//         })
//     }
//     //console.log(error.message)
//     );
// }


//"use strict";
//const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// exports.sendmail = async (req,res) =>{
//   const {to,text,subject} = req.body
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing

//   const CLIENT_ID = '78813466355-slkfaq7juqkp22ho2dj12h5u2a26u9j8.apps.googleusercontent.com';
// const CLEINT_SECRET = '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';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const REFRESH_TOKEN = '1//04qvb03l1rrzjCgYIARAAGAQSNwF-L9Ir5MD_ZMQnBbV2nduYyq_bYNVCy2jLzBE7iIrLgZGnBr5bCVGWH6mYXJTT4JSMRGa9MKM';

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLEINT_SECRET,
//     REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const accessToken = await oAuth2Client.getAccessToken();
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: 'contactus@brahmaand.space',
//         clientId: CLIENT_ID,
//         clientSecret: CLEINT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//     },
// });
// console.log("transporter",transporter)
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'SENDER NAME <contactus@brahmaand.space>',
//             to: to,
//             subject:subject, // 'Hello from gmail using API',
//             text: subject,//'Hello from gmail email using API',
//             html: '<h1>Hello from gmail email using API</h1>',
//   })
//   const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }


// sendMail()
//   .then((result) => console.log('Email sent...', result))
//   .catch((error) => console.log(error.message));
// Footer
//   .then((data)=>{
//     res.status(200).json({
//       status: true,
//       data: data,
//     });
//   }).catch((error)=>{
//     res.status(400).json({
//       status: false,
//       error: error,
//     });
//   });

 // console.log("Message sent: %s", info);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
 // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//}

// main().catch(console.error);

exports.sendmail = async (req,res) =>{

    const CLIENT_ID = '78813466355-slkfaq7juqkp22ho2dj12h5u2a26u9j8.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04qvb03l1rrzjCgYIARAAGAQSNwF-L9Ir5MD_ZMQnBbV2nduYyq_bYNVCy2jLzBE7iIrLgZGnBr5bCVGWH6mYXJTT4JSMRGa9MKM';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'contactus@brahmaand.space',
                        clientId: CLIENT_ID,
                        clientSecret: CLEINT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,
                    },
                });
                console.log("transport",transport)
        
                const mailOptions = {
                    from: 'SENDER NAME <contactus@brahmaand.space>',
                    to: 'pratimadevelopersveltosest@gmail.com',
                    subject: 'Hello from gmail using API',
                    text: 'Hello from gmail email using API',
                    html: '<h1>Hello from gmail email using API</h1>',
                };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
}