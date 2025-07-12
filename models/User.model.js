const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[ true , 'Name is required'],
        trim : true,
        minlength:[3 , 'Minimum length is 3 characters'],
        maxlength:[50 , 'Maximum length is 50 characters '],
    } ,  
    email:{
        type:String,
        required : [true , 'Email is required'],
        unique : true , 
        lowercase : true ,
        trim : true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password : {
        type : String ,
        required : [true ,'Password is required'],
        minlength : [6 , 'Minimum length is 6 characters'],
        select : false // Do not return password in queries 
    },
    role :{
        type : String ,
        enum : ['attendee' , 'organizer', 'admin'],
        default:'attendee'
    }
},{
    timestamps:true 
})


module.exports = mongoose.model('User', userSchema);