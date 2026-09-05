import { Router } from "express";
const router=Router()

import authMiddleware from "../Middleware/authMiddleware.js";
import prisma from "../config/dbCongfig.js";

router.post("/preference",authMiddleware,async(req,res)=>{
          const userId=req.user.userId
try{
    const preference=req.body.Preference.map(term=>term.trim())
 console.log(preference);

const PreferenceData= await prisma.userPreference.createMany({
    data:preference.map(term=>({
        userId:userId,
        userPreferedKeyword:term
    })),
      skipDuplicates: true

 })
 console.log(PreferenceData);
 
 res.status(200).json({message:"Successfully added"})
}
catch(err){
    res.status(401).json({messsgae:"couldnt add,try again"})
}
})

export default router;