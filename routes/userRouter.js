import {Router} from "express";
import {buscarUsuario, crearUsuario, actualizarUsuario, borrarUsuario} from "../Controllers/usuarios.controllers.js"

const userRouter = Router();

userRouter.get("/:nombre", buscarUsuario);
userRouter.post("/", crearUsuario);
userRouter.put("/:nombre", actualizarUsuario);
userRouter.delete("/:nombre", borrarUsuario);

export default userRouter