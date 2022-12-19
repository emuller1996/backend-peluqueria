const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require("mongoose-paginate-v2");


const clientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true
      },
    phoneNumber : {
        type: Number,
        required: true
      },
    email: String,
    age : Number,
    address :String
}, {
    collection: 'client'
})
clientSchema.plugin(mongoosePagination);
module.exports = mongoose.model('client', clientSchema)