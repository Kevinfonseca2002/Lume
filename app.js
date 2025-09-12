import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import storesRouter from "./routes/storesRoutes.js";
import express from "express"
import userRouter from "./routes/userRouter.js";
import eventsRouter from "./routes/eventsRoutes.js";


const app = express();

app.use(express.json);


app.use("/store",storesRouter);
app.use("/user",userRouter);
app.use("/events", eventsRouter);

export default app;
