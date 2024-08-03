import express from 'express';
import candidate from '../models/candidate.js';
import {generateToken,verifyToken} from '../middleware/auth.js'

const router = express.Router()

router.post("/",async (req,res)=>{
    try {
    //storing all the body data comming from client into data
   const data=req.body;
   //creating a newuser usign user model
   const newCandidate=new candidate(data);
   const response=await newCandidate.save();
   console.log("data saved");
   //creavting a payload to generate a token, it should be pure object

    res.status(200).json({response:response})
} catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
}
})


router.post('/login',async (req,res)=>{
    try {
        const{email,idNumber,password}=req.body
        const user= await user.find({idNumber});
        
       if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"Invalid user or password"})
       }
        
       const payload={
        id:response.id
       }
       
        const token=generateToken(payload);
        console.log("token is generated",token)
        res.status(200).json({token})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})


router.get('/profile',verifyToken,async(req,res)=>{
    try {
        const userData=res.user;
        console.log("user data is :",userData)

        const userId=userData.id
        const user=await user.findById(userId);
        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
})


router.put("/profile/password",verifyToken,async(req,res)=>{
    try {
        const userId=req.user.id;
        const {currentpassword,newpassword}=req.body;

        const user=await user.findById({userId})

        if( !(await user.comparePassword(currentpassword))){
            return res.status(401).json({error:"Invalid user or password"})
        }
        
        user.password=new newpassword;
        await user.save()
        console.log("password changed")
        res.status(200).json({message:"password updated"})

    } catch (error) {
        
    }
})

export default router;