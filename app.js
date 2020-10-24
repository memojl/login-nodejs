const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
//Capturar body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Conexion a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.emcqd.gcp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, 
  {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>console.log('Base de datos conectada'))
.catch(e => console.log(e));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.static(__dirname + "/public"));

//Rutas Web
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req,res,next)=>{
  res.status(404).render('404', {
    titulo: '404',
    msj: 'Página no encontrada'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
