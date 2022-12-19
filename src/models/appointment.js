const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    services : [{ type: Schema.Types.ObjectId, ref: 'services' }],
    barber_id : { type: Schema.Types.ObjectId, ref: 'barber' },
    client_id : { type: Schema.Types.ObjectId, ref: 'client' },
    date : {
        type: Date,
        required: true
      } ,
    hour : {
        type: String,
        required: true
      },
    state : {
        type: String,
        required: true
      }

}, {
    collection: 'appointment'
})
module.exports = mongoose.model('Appointment', appointmentSchema)