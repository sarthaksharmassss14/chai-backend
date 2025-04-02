import mongoose, {Schema} from "mongoose"
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken"

const userschema = new Schema(
    {
username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
},
email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
    
},
fullname:{
    type: String,
    required: true,
   
   
    trim: true,
    index: true
},
avatar:{
    type: String,
    required: true,
   
},
coverimage:{
    type: String
},
watchhistory:[
    {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }

],
password:{
    type: String,
    required:[true, 'password required']
},
refreshtoken:{
    type: String
}

},{timestamps: true}
)
userschema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
        this.password= bcrypt.hash(this.password, 10)
    next()
})
userschema.methods.isPasswordCorrect= async function(password)
{
    return await bcrypt.compare(password, this.password)
}
userschema.methods.generateAccesstoken= function(){
    return jsonwebtoken.sign({
_id: this._id,
email: this.email,
username: this.username,
fullname: this.fullname
 } ,
 process.env.ACCESS_TOKEN_SECRET,
 {
expiresin: process.env.ACCESS_TOKEN_EXPIRY
 })

    
}
userschema.methods.generateRefreshtoken= function(){
    return jsonwebtoken.sign({
        _id: this._id
        
         } ,
         process.env.REFRESH_TOKEN_SECRET,
         {
        expiresin: process.env.REFRESH_TOKE_EXPIRY
         })
        
            
        }

export const User= mongoose.model("User", userschema)