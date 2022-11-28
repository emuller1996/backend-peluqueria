const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String,
    description : String,
    price : Number
}, {
    collection: 'services'
})
module.exports = mongoose.model('services', servicesSchema)