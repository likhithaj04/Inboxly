import { Router } from "express";
const router=Router()

import analyzeEmails from "../services/emailBehaviourService.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import prisma from "../config/dbCongfig.js";

// import emailFilterService from "../services/emailFilterService.js";

// import prisma from "../config/dbCongfig";
// import { google } from "googleapis";
// import  getGoogleAuthClient from '../services/authService.js'
// import fetchInboxEmails from "../services/gmailService.js";
import retrieveKeywordStat from "../services/keywordStatService.js";
// import updateKeywordStats from "../services/keywordUpdateService.js";
// import getEmailSync from '../services/emailSyncService.js'





router.get("/api/gmail",authMiddleware,async(req,res)=>{
   console.log("api/gmail-hit");
   
   const userid=req.user.userId;
   // console.log("user",userid);
   // res.json({userid})

//    const emailSync=await getEmailSync(userid)
//  const emails=await fetchInboxEmails(userid,lastCheckedAt) // to get all emails
//   const meaningfulWords= await retrieveKeywordStat(emails)
//   updateKeywordStats(meaningfulWords,userid,emails);
const analyseEmails=await analyzeEmails(userid)
  // const filteredEmail=emailFilterService(analyseEmails,userid);
return res.status(200).json({
    success: true,
    emails: analyseEmails
});
})

router.get("/api/demoemail",authMiddleware,async(req,res)=>{

  const userId=req.userId;

  const emails=await prisma.demoEmail.findMany({
    where:{
      userId:userId
    }
  })

  
return res.status(200).json({
    success: true,
    emails: emails  
  })
  
})

export default router;