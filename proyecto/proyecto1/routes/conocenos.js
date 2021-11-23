var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('conocenos', { title: 'Express'});
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.comentarios;

  console.log(req.body);

  var obj = {
    to: 'giacomonicandelar@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + " se contactó a través de la web y quiere más información a este correo : " + email + ". <br> Además, hizo el siguiente comentario: " + mensaje + ". <br> Su tel es " + tel 
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('conocenos', {
    message: 'Mensaje enviado correctamente',
  });

})

module.exports = router;