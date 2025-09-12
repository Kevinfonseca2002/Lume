import { createEvents, findEvents, updateEvents, deleteEvents } from "../Controllers/events.controllers.js";
import { Router } from "express";


const eventsRouter = Router();


eventsRouter.get("/:name", findEvents);
eventsRouter.post("/", createEvents);
eventsRouter.put("/:name", updateEvents);
eventsRouter.delete("/:name", deleteEvents);

export default eventsRouter