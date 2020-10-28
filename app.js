const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//Capturar body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Conexion a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.emcqd.gcp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(uri, options)
.then(()=>console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e));

// Motor de plantillas

//Rutas Web
const authRoutes = require('./router/auth');
const validaToken = require('./router/validate-token');
const admin = require('./router/admin');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, admin);

app.get('/',(req,res)=>{
  res.json({
    estado: true,
    mensaje: 'funcional'
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
