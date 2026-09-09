import { google } from "googleapis";
import authclient from "../config/authConfig.js";
import prisma from '../config/dbCongfig.js'
import jwt from 'jsonwebtoken'
import { Router } from "express";
import { authLimiter } from "../Middleware/rateLimitter.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = Router();



router.get("/google", authLimiter, (req, res) => {
  try {
    // console.log("auth1 hit");

    const authurl = authclient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ]
    })
    res.redirect(authurl);
  } catch (err) {
    console.log(err);
  }




})
router.get("/google/callback", authLimiter, async (req, res) => {
  try {
    // console.log("Auth hit");
    const { code } = req.query;
    // console.log("code recived", code)

    const { tokens } = await authclient.getToken(code);
    // console.log("token recieved", tokens);

    authclient.setCredentials(tokens);
    console.log("tokens", tokens);
    console.log("access token exists:", !!tokens.access_token);
    console.log("client", authclient.credentials);

    console.log("Google authentication successful");

    const auth2Client = google.oauth2({
      auth: authclient,
      version: 'v2'
    });

    const userInfo = await auth2Client.userinfo.get()
    // console.log(userInfo);

    const users = userInfo.data
    // console.log(users);

    //     const finduser=await prisma.user.findUnique({
    //       where:{
    //           googleId: users.id,
    //       }
    //     })
    // if(!finduser){
    //    const newUser = await prisma.user.create({
    //       data: {
    //         googleId: users.id,
    //         name: users.name,
    //         email: users.email
    //       }
    //     })

    //     console.log(newUser);
    // }
    // console.log("usrs",users.id);

    const user = await prisma.user.upsert({
      where: {
        email: users.email
      },
      update: {
        name: users.name,
        googleId: users.id
      },
      create: {
        googleId: users.id,
        name: users.name,
        email: users.email
      }
    })
// console.log("prisma fetched",user.id);
// console.log("userrrrrrrrrrrrrrrr",user.id);

    const googleaccount = await prisma.googleAccount.upsert({
      where: {
        userId: user.id
      },
      update: {
        accessToken: tokens.access_token,
        ...(tokens.refresh_token && {
          refreshToken: tokens.refresh_token
        }),
        expiryDate: tokens.expiry_date

      },
      create: {
        userId: user.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date
      }

    })

    // console.log(googleaccount);
    
    const jwt_token = jwt.sign({
      userId: user.id,
      email: user.email
    },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    // console.log(jwt_token);

   const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", jwt_token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "strict",
  maxAge: 7200000
});
    
    res.redirect('http://localhost:5173/home'); 
    // res.status(200).json({ message: "Login successful" })


  } catch (err) {
    console.error(err);
    res.status(500).send("Authentication failed");
  }
})


router.post("/logout",(req,res)=>{
  const isProduction = process.env.NODE_ENV === "production";

res.clearCookie("token", {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "strict"
});
  res.status(200).json({ message: 'Logged out' })
})


router.get("/me", authMiddleware, async (req, res) => {
  try {
// console.log(req.user.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        googleId: true
      }
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      user
    });

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "user not found" })

  }
})


//demo user route


router.post("/demoLogin", async (req, res) => {

  const {email}=req.body
  try {

    const demouser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!demouser) {
      return res.status(404).json({
        message: "Demo user not found"
      });
    }

    const jwt_token = jwt.sign(
      {
        userId: demouser.id,
        email: demouser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

   const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", jwt_token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "strict",
  maxAge: 7200000
});

    res.status(200).json({
      message: "Demo login successful",
      isDemo:true
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Authentication failed"
    });
  }
});


export default router;