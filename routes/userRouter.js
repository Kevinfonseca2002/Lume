import {Router} from "express";
import {findUser, createUser, updateUser, deleteUser} from "../Controllers/user.controllers.js"

const userRouter = Router();

userRouter.get("/:name", findUser);
userRouter.post("/", createUser);
userRouter.put("/:name", updateUser);
userRouter.delete("/:name", deleteUser);

export default userRouter