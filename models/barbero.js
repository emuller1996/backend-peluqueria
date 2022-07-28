const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const barberoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    },
    nombre: String,
    servicios : String,
    rol : String
}, {
    collection: 'barberos'
})
module.exports = mongoose.model('Barbero', barberoSchema)