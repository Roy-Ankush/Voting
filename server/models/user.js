import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const user_schema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Given email is already exist in database"],
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Invalid email address!")
        //     }
        // }
        
    },
    idNumber:{
        type:String,
        require:true,
        unique: [true, "Given ID is already exist in database"],
    },
    password:{                                                                              
        type:String,
        required:true,
        minLength:1,
        maxLength:20
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:"voter",
    },
    isVoted:{
      type:Boolean,
      default:false
    }
   
})



user_schema.pre('save', async function (next) {
    const user=this;
    if(!user.isModified('password')) return next();

    try {
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(this.password, salt)
    user.password=hashedPassword;
    next();
} catch (error) {
        return next(error)
}
})


user_schema.methods.comparePassword=async function(candidatepassword){
    try {
        const isMAtch=await bcrypt.compare(candidatepassword,this.password);
        console.log("password is match",isMAtch)
        return isMAtch;
    } catch (error) {
        throw error;
    }
}

const user=new mongoose.model("user",user_schema);

export default user;