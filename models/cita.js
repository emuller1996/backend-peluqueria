const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    nombre: String,
    servicios : String,
    barbero_id : [{ type: Schema.Types.ObjectId, ref: 'barberos' }],
    fecha : Date,
    hora : String,
    estado : String

}, {
    collection: 'citas'
})
module.exports = mongoose.model('Cita', citaSchema)