import express from "express";
import router from "./routes/routes.js";
import { notFound } from "./errorHandling/not-found.js";
import globalErrorHandler from "./errorHandling/globalErrorHandler.js";
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to our api");
});

app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(globalErrorHandler);

mongoose.connect("mongodb+srv://user:user123@cluster0.rqsulab.mongodb.net/test4")
    .then(() => {
        console.log('connected to DB');
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    })
    .catch((error) => console.log(error));

