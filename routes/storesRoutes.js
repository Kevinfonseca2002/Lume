import {Router} from "express";
import { findStore, createStore, updateStore, deleteStore} from "../Controllers/stores.controllers.js";

const storesRouter = Router();

storesRouter.get("/:name", findStore);
storesRouter.post("/", createStore);
storesRouter.put("/:name", updateStore);
storesRouter.delete("/:name", deleteStore);

export default storesRouter