const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    nombre: String,
    descripcion : String,
    precio : Number
}, {
    collection: 'servicios'
})
module.exports = mongoose.model('Servicios', servicioSchema)