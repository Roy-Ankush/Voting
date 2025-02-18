import express from 'express';
import user from '../models/user.js';
import bcrypt from 'bcryptjs'
import {generateToken,setAccessTokenCookie,setRefreshTokenCookie,verifyToken} from '../middleware/auth.js'

const router = express.Router()

router.post("/signup",async (req,res)=>{
    try {
    //storing all the body data comming from client into data
   const data=req.body;
   //creating a newuser usign user model
   const newUser=new user(data);
   const response=await newUser.save();
   console.log("data saved");
   //creavting a payload to generate a token, it should be pure object
   const payload={
    id:response.id
   }
   
    const token=generateToken(payload);
    res.status(200).json({response:response,token:token})
} catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
}
})


router.post('/login',async (req,res)=>{
    try {
        const{email,idNumber,password}=req.body
        const users= await user.find({idNumber});
        const userpassword=await bcrypt.compare(password,users[0].password);
        
       if(!users){
        return res.status(401).json({error:"Invalid user or password"})
       }
       if(!userpassword){
        console.log("wrong password")
        return res.send(404).json({error:"Invalid password"});
    }
       
       const payload={
        id:users[0].id
       }
       
       
       const accessToken = generateToken(payload);
       const refreshToken = generateToken(payload);

       setAccessTokenCookie(res,accessToken);
       setRefreshTokenCookie(res,refreshToken)
        //sending the token in rensponse
        return res.status(200).json({ accessToken, refreshToken, Login: true});

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

        const user=await user.findById(userId)

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