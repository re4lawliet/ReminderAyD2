"use strict"
const express = require('express');
 var assert = require('assert');
 var request = require('supertest')
 var app = express();

 var request = request("http://localhost:3000")

 describe('Registrar', function() {
    describe('POST', function(){
        it('Deberia retornar "User Agregado con Exito"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"1234", confirm_password:"1234" }
            request.post('/users/registro').send(user).expect('User Agregado con Exito');
        });
        it('Deberia retornar "Contraseña no coincide"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"1234", confirm_password:"1235" }
            request.post('/users/registro').send(user).expect('Contraseña no coincide');
        });
        it('Deberia retornar "La contraseña debe ser mayor que 4 caracteres"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"12", confirm_password:"12" }
            request.post('/users/registro').send(user).expect('La contraseña debe ser mayor que 4 caracteres');
        });
        
        it('Deberia retornar "El Usuario ya esta en Uso"',function(){
            let user = { name:"prueba1", email:"prueba@gmail.com", password:"1234", confirm_password:"1234" }
            request.post('/users/registro').send(user).expect('El Usuario ya esta en Uso');
        });
        
    });
 });