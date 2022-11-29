const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const barberSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image:String,
    name: String,
    services : [{ type: Schema.Types.ObjectId, ref: 'services' }],
    rol : String
}, {
    collection: 'barber',
    timestamps: true
})
module.exports = mongoose.model('barber', barberSchema)