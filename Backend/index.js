import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import {errorHandler, routeNotFound} from "./middlewares/errors.js";
import routes from "./routes/index.js";


dotenv.config();

dbConnection();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({
    //origin : "http://localhost:3000",
    origin : 'http://tree-task.uksouth.cloudapp.azure.com',
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
