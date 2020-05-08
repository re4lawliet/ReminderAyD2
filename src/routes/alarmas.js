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

router.get('/alarmas/edit/:id', isAuthenticated, async(req, res) => {
    const note1 = await Alarma.findById(req.params.id);

    const note=[];
    note.push({
        title: note1.title, 
        description: note1.description, 
        _id:note1._id
    });
    
    res.render('alarmas/edit-alarma.hbs', {note});
});

router.put('/alarmas/edit-alarma/:id', isAuthenticated, async(req, res) => {
    
    const alarma=await Alarma.findById(req.params.id);
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

    const fecha_final=dia+"/"+mes+"/"+año;
    const hora_final=horas+":"+minutos+horario;
    console.log(fecha_final+hora_final);
    alarma.title=title;
    alarma.description=description;
    alarma.aplicacion=aplicacion;
    alarma.cuando=cuando;
    alarma.donde=donde;
    alarma.recurrente=recurrente;
    alarma.programacion=programacion;
    alarma.fecha=fecha_final;
    alarma.hora=hora_final;
    alarma.user = req.user.id;
    await alarma.save();

    req.flash('succes_msg','Alarma Modificada');
    res.redirect('/alarmas/alarmas');
});

router.get('/alarmas/desactivar/:id', isAuthenticated, async(req, res) => {
    const alarma=await Alarma.findById(req.params.id);
    alarma.recurrente=false;
    await alarma.save();

    req.flash('succes_msg','ALARMA DESACTIVADA');
    res.redirect('/alarmas/alarmas');
});

router.get('/alarmas/activar/:id', isAuthenticated, async(req, res) => {
    const alarma=await Alarma.findById(req.params.id);
    alarma.recurrente=true;
    await alarma.save();

    req.flash('succes_msg','ALARMA ACTIVADA');
    res.redirect('/alarmas/alarmas');
});

router.delete('/alarmas/delete/:id', isAuthenticated, async(req, res) => {
    await Alarma.findByIdAndDelete(req.params.id);
    req.flash('succes_msg','Se A eliminado ALARMA');
    res.redirect('/alarmas/alarmas');
});

module.exports = router;