  
const { Schema, model } = require("mongoose");

const NotaGaleriaSchema = new Schema(
    {
        id_nota: {
            type: String,
            required: true
        },
        foto: {
            type: String,
        },
        estado: {
            type: Boolean
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = model("VehiculoGaleria", NotaGaleriaSchema);