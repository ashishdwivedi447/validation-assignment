const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
{
    firstName:{type:String,required:false},
    lastName:{type:String,required:true},
    email:{type:String, required:true},
    pincode:{type:Number,required:true},
    age:{type:Number,required:true},
    gender:{type:String,
        required:false, 

        enum:["Male","Female","others"],
    }
    
},
{versionKey:false,
    timestamps:true,

},
);



module.exports= mongoose.model("user",userSchema);