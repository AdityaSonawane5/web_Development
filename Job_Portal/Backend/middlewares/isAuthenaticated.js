import jwt from "jsonwebtoken";
// middelware
const isAuthenticated =async (req ,res ,next)=>{
    try {
        const token =await req.cookies.token;
        if(!token){
            return res.status(401).json({
                massage:"user not Authenticated",
                success:true
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                massage:"Invelid Token",
                success:false
            })
        }
        req.id=decode.userId;
        next()
    } catch (error) {
        console.log(error)
        
    }
}
export default isAuthenticated;