//courseModel.js
const mongoose= require('mongoose');
const courseSchema= new mongoose.Schema({
    courseId: Number,
    courseName: String,
    credits: Number,
}, {
 timestamps: true,   
})

module.exports= mongoose.model('Course', courseSchema);