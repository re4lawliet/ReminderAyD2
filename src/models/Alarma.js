  
const { Schema, model } = require("mongoose");

const AlarmaSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        aplicacion: {
            type: String
        },
        cuando: {
            type: String
        },
        donde: {
            type: String
        },
        recurrente: {
            type: Boolean
        },
        programacion: {
            type: String
        },
        fecha: {
            type: String
        },
        hora: {
            type: String
        },
        user: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = model("Alarma", AlarmaSchema);