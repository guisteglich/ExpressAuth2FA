const mongoose = require('../../config/mongo') 

const UserModel = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    gender: String,
    phoneNumber: String,
    birthDate: Date,
    password: String,
    address: {
        street: String,
        district: String,
        city: String,
        state: String,
        zipCode: String, 
        country: String,
    },
    createdAdt: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('users', UserModel)

module.exports = Users