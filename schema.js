const mongoose = require('./database');

const rjschema = new mongoose.Schema({
    FirstName : String,
    LastName : String,
    email : String,
    password : String
})

const student = new mongoose.model("student",rjschema);

module.exports = student;