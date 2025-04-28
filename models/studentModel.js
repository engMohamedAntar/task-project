//studentModel.js
const mongoose= require('mongoose');
const studentSchema= new mongoose.Schema({
    studentId: Number,
    name: String,
    email: String,
    phone: String,
    currentYear: Number
}, {
 timestamps: true,   
})

module.exports= mongoose.model('Student', studentSchema);