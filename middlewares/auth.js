import { verifyJwt } from "../lib/jwt.js";

export function requiredAuth(re,res,next){
    const auth= req.header.authorization||" ";
    const token= auth.startsWith("Bearer ")?auth.slice(7): null;

    if(!token) return res.status(401).json({error: "Token requerido"})

        try{
            req.user= verifyJwt(token);

        }
        catch{
            res.status(401).json({error: "Token invalido o expirado"});
        }

}