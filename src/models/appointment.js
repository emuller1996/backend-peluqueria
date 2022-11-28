const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String,
    services : [{ type: Schema.Types.ObjectId, ref: 'services' }],
    barber_id : { type: Schema.Types.ObjectId, ref: 'barber' },
    date : Date,
    hour : String,
    state : String

}, {
    collection: 'appointment'
})
module.exports = mongoose.model('Appointment', appointmentSchema)