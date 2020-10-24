const express = require('express');
const router = express.Router();
const Mascota = require('../models/mascota');

//Lista-array
router.get('/', async (req, res)=>{
    try {
        const arrayMascotasDB = await Mascota.find();
        res.render('mascotas',{
            arrayMascotas: arrayMascotasDB
        });      
    } catch (error) {
        console.log(error);
    }
});

//FORMULARIO
router.get('/crear', (req, res)=>{
    res.render('crear')
})

//GUARDAR
router.post('/', async(req, res)=>{
    const body = req.body;
    console.log(body); 
    try {
        await Mascota.create(body)
        res.redirect('/mascotas')
    } catch (error) {
        console.log('error', error)
    }   
})

//EDITAR FORM
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findOne({ _id:id })//console.log(mascotaDB)
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id selecionado'
        })
    }
})

//EDITAR
router.put('/:id', async(req,res)=>{
    const id = req.params.id
    const body = req.body

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {useFindAndModify: false})
        console.log(mascotaDB)        
        res.json({
            estado: true,
            mensaje: 'Editado'
        })        
    } catch (error) {
        console.log(error)
    }
})

//ELIMINAR
router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id:id })
        if(mascotaDB){
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'Fallo eliminado!'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;