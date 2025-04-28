//adminModel.js
const mongoose= require('mongoose');
const adminSchema= new mongoose.Schema({
    adminId: Number,
    username: String,
    password: String,
    role: String
}, {
 timestamps: true,   
})

module.exports= mongoose.model('Admin', adminSchema);