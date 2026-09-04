import { google } from "googleapis";
import prisma from "../config/dbCongfig.js";

const getGoogleAuthClient=async(userId)=>{
   const googleaccount=await prisma.googleAccount.findUnique({
    where:{
        userId:userId
    }
   })

   if(!googleaccount) throw new Error("google account not connected")

  if(!googleaccount.refreshToken) throw new Error("Refresh token not available");
 
   const authclient=new google.auth.OAuth2(
process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI  
 )

  authclient.setCredentials({
        access_token: googleaccount.accessToken,
        refresh_token: googleaccount.refreshToken,
        expiry_date: googleaccount.expiryDate
            ? Number(googleaccount.expiryDate)
            : undefined
    });
return {
        authclient,
        googleaccount
    };
};  //using Gmail after the user has already logged in.

export default getGoogleAuthClient;