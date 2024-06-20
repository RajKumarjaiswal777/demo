const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/demodb")
.then(()=>{
    console.log("database is connected succesfully");
})
.catch(()=>{
    console.log("database is not connected succesfully");
})

module.exports = mongoose;