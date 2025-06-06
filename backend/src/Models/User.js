import mongoose from "mongoose"
import bcrpyt from "bcryptjs"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

fullname:{
 type:String,
 required: true,
},

email:{
    type:String,
    required: true,
    unique:true,
},
password:{
    type:String,
    minlength: 6,
    required: true,
},

bio:{
    type:String,
    default:"",
},
profilePic:{
    type:String,
    default:""
},
nativelanguage:{
    type:String,
    default:"",
},
location:{
    type:String,
    default:""
},
isOnboarded:{
    type:Boolean,
    default:false
},
friends:[
{   
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}
]
},
{timestamps:true})

//  pre hook which encrypted the password 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
  try {
    const salt = await bcrpyt.genSalt(10);
    this.password= await bcrpyt.hash(this.password,salt);

    next();
  } catch (error) {
    next(error);
  }  
})

// Comparing the passowrd which was going through the login process
userSchema.methods.matchPassword= async function (entirePassword) {
    const isPasswordCorrect=await bcrypt.compare(entirePassword,this.password)
    return isPasswordCorrect;
}
    



const User = mongoose.model("User",userSchema);




export default User;