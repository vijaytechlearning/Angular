const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    rollNumber: {type: Number, require: true},
    name: {type: String, require: true},
    imagePath: { type: String, required: true }
})

module.exports =  mongoose.model( 'Student' , studentSchema)
