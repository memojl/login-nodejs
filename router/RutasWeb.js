"use strict";
const express = require('express');
const nodemailer = require('nodemailer');//
const router = express.Router();
require('dotenv').config();

router.get('/',(req, res)=>{
  res.render('index',{titulo: 'Mi titulo dinamico'});
});

router.get('/nosotros',(req, res)=>{
  res.render('nosotros',{titulo: 'Nosotros'});
});

router.get('/servicios',(req, res)=>{
  res.render('servicios',{titulo: 'Servicios'});
});

router.get('/contacto',(req, res)=>{
  res.render('contacto',{titulo: 'Contacto'});
});

router.post('/send', async(req, res)=>{
  const { nombre, email, tel, msj } = req.body; 
  let contentHTML = `
    <h1>Información de contacto</h1>
    <ul>
      <li>${nombre}</li>
      <li>${email}</li>
      <li>${tel}</li>
    </ul>
    <p>${msj}</p>
  `;
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
    tls: {rejectUnauthorized: false}
  });

  const info = await transporter.sendMail({
    from: "'Multiportal' <multiportal@outlook.com>",
    to: 'memojl08@gmail.com',
    subject: 'Correo de Contacto',
    html: contentHTML
  });
  
  console.log('Mensaje enviado', info.messageId);
  res.redirect('/success.html');
});

module.exports = router;