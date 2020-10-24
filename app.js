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

//Rutas Web
const authRoutes = app.use('/', require('./router/auth'));

// route middlewares
app.use('/api/user', authRoutes);

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
