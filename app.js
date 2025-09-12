import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import storesRouter from "./routes/storesRoutes.js";
import express from "express"
import userRouter from "./routes/userRouter.js";

const app = express();


app.use("/tienda",storesRouter);
app.use("/usuario",userRouter);
export default app;
