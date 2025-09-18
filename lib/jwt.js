import jwt from "jsonwebtoken";
const {JWT_SECRET, JWT_EXPIRES}=process.env;

export const signJwt= (payload,opts = {}) => jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET||"1h",...opts}); 
export const verifyJwt= (token)=> jwt.verify(token, process.env.JWT_SECRET);
