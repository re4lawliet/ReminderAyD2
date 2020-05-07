function compararDatos(password, confirm_password){
    return password==confirm_password;
}

function passwordCorta(password){
    return password.length > 4
}

var assert = require("assert")

describe('Compara Password', function() {
    describe('Unitaria', function() {

        it('Deberia retornar "true"',function(){
            var password="1234", confirm_password="1234";
            
            assert.equal(true,compararDatos(password,confirm_password))
        });
        it('Deberia retornar "false"',function(){
            var password="1234", confirm_password="1239";
            assert.equal(false,compararDatos(password,confirm_password))
        });
    });
 });

 describe('Comparar numero de caracteres en password', function() {
    describe('Unitaria', function() {

        it('Deberia retornar "true"',function(){
            var password="124353";
            
            assert.equal(true,passwordCorta(password))
        });
        it('Deberia retornar "false"',function(){
            var password="12";
            assert.equal(false,passwordCorta(password))
        });
    });
 });