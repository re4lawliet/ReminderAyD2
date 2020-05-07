"use strict"
const express = require('express');
 var assert = require('assert');
 var request = require('supertest')
 var app = express();

 //var request = request("http://localhost:3000")

 var request = request("http://104.198.219.201:3000")

 describe('Registrar', function() {
    describe('Funcional', function(){
        /*it('Deberia retornar "User Agregado con Exito"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"1234", confirm_password:"1234" }
            request.post('/users/registro').send(user).expect('User Agregado con Exito');
        });
        */
        it('Deberia retornar "Contraseña no coincide"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"1234", confirm_password:"1235" }
            request.post('/users/registro').send(user).expect({text:'Contraseña no coincide'});
        });
        it('Deberia retornar "La contraseña debe ser mayor que 4 caracteres"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"12", confirm_password:"12" }
            request.post('/users/registro').send(user).expect({text:'La contraseña debe ser mayor que 4 caracteres'});
        });
        
        it('Deberia retornar "El Usuario ya esta en Uso"',function(){
            let user = { name:"Carlos Andree Avalos Soto", email:"aavalosoto@gmail.com", password:"admin", confirm_password:"admin" }
            request.post('/users/registro').send(user).expect({text:'El Usuario ya esta en Uso'});
        });
        
    });
 });


 describe('Agregar nota', function() {
    describe('Funcional', function(){
        it('Deberia retornar "{text:\'Porfavor escriba el titulo\'}"',function(){
            let note = { title:"", description:"Esto es una una descripcion para una nota de prueba" }
            request.post('/notas/crear').send(note).expect({text:'Porfavor escriba el titulo'});
        });
        it('Deberia retornar "{text:\'Porfavor escriba la descripcion\'}"',function(){
            let note = { title:"Titulo de prueba", description:"" }
            request.post('/notas/crear').send(note).expect({text:'Porfavor escriba la descripcion'});
        });
        
    });
 });