const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true
      },
    phoneNumber : Number

}, {
    collection: 'client'
})
module.exports = mongoose.model('Client', clientSchema)