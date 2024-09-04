import express from 'express';
import candidate from '../models/candidate.js';
import {generateToken,verifyToken} from '../middleware/auth.js'
import checkAdminRole from '../middleware/checkAdmin.js';

const router = express.Router()

router.post("/",async (req,res)=>{
    try {
    //storing all the body data comming from client into data
    if(!await checkAdminRole(req.user.id)){
        return res.status(403).json({error:"role not match for Admin request"})
    }
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



router.put("/:candidateID",async(req,res)=>{
    try {
        if(!await checkAdminRole(req.user.id)){
            return res.status(403).json({error:"role not match for Admin request"})
        }
       const candidateID=req.params.candidateID
       const updatePersonData=req.body;

       const response=await candidate.findByIdAndUpdate(candidateID,updatePersonData,{
        new:true,
        runValidator:true
       })

       if(!response){
        return res.status( 404).json({error:"candidate not found"})
       }
       console.log("candidate data updated")
       res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})


router.delete("/:candidateID",async(req,res)=>{
    try {
        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({error:"role not match for Admin request"})
        }
       const candidateID=req.params.candidateID

       const response=await candidate.findByIdAndDelete(candidateID)

       if(!response){
        return res.status( 404).json({error:"candidate not found"})
       }
       console.log("candidate deleted")
       res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})

export default router;