import {Router} from "express";
import User from '../models/Users.js';
import {findUser, createUser, updateUser, deleteUser} from "../Controllers/user.controllers.js"

const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  try {
    const usuarios = await User.find().lean();
    res.json(usuarios);
  } catch (err) { next(err); }
});

userRouter.get("/:name", findUser);
userRouter.post("/", createUser);
userRouter.put("/:name", updateUser);
userRouter.delete("/:name", deleteUser);

export default userRouter