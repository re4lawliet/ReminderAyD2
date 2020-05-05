// Rutas de usuario
const express = require('express');
const router =  express.Router();
const upload = require('../config/storage');

const Note = require('../models/Note');
const NotaGaleria = require('../models/NotaGaleria');
const Alarma = require('../models/Alarma');
const { isAuthenticated } = require('../helpers/auth');


router.get('/alarmas/nueva-alarma', isAuthenticated, (req, res) => {
    res.render('alarmas/new-alarma.hbs');
});

router.post('/alarmas/crear', isAuthenticated, async(req, res) => {
    
    const title = req.body.title;
    const description=req.body.description;
    const aplicacion=req.body.aplicacion;
    const cuando=req.body.cuando;
    const donde=req.body.donde;
    const recurrente=req.body.recurrente;
    const programacion=req.body.programacion;

    //fecha:
    const dia=req.body.dia;
    const mes=req.body.mes;
    const año=req.body.año;

    //hora
    const horas=req.body.horas;
    const minutos=req.body.minutos;
    const horario=req.body.horario;

    const errors=[];

    if(!title){
        errors.push({text:'Porfavor escriba el titulo'});
    }
    if(!description){
        errors.push({text:'Porfavor escriba la descripcion',});
    }

    if(errors.length>0){
        res.render('notes/new_note.hbs', {
            errors,
            title,
            description
        });
    }else{
        const fecha_final=dia+"/"+mes+"/"+año;
        const hora_final=horas+":"+minutos+horario;
        console.log(fecha_final+hora_final);
        const newalarm= new Alarma({title,description, aplicacion, cuando, donde, recurrente, programacion});
        newalarm.fecha=fecha_final;
        newalarm.hora=hora_final;
        newalarm.user = req.user.id;
        await newalarm.save();
        req.flash('succes_msg', 'Alarma Agregada Con Exito');
        res.redirect('/alarmas/alarmas');
    }
});

router.get('/alarmas/alarmas',isAuthenticated, async(req, res) => {
    const notes = await Alarma.find({user: req.user.id}).sort({date:'desc'})

    const notes2=[];

    for(var title in notes){ 
        notes2.push({title: notes[title].title, description: notes[title].description, _id: notes[title]._id, hora:notes[title].hora, fecha:notes[title].fecha, recurrente:notes[title].recurrente });
    }
    res.render('alarmas/all-alarmas.hbs', { 
        notes,
        notes2 
    });
});

module.exports = router;