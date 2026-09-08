import jwt from 'jsonwebtoken'

const authMiddleware=(req,res,next)=>{
    try{
        // console.log("middleware hit");
        
        const token=req.cookies.token;
        // console.log(token);
        
        if(!token) return res.status(401).json({message:'Not authenticated'})
        
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // console.log("decoded",decoded)
        req.user=decoded
        
        next()
    }
    catch(err){
return res.status(401).json({message:'Invalid token'})    
    }
}

export default authMiddleware;