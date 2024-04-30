import express from "express";
import router from "./routes/routes.js";
import { notFound } from "./errorHandling/not-found.js";
import globalErrorHandler from "./errorHandling/globalErrorHandler.js";
import mongoose from "mongoose";


const app = express()
const PORT = 5000
// chefs ids => ahmed : 662f97b00834453b1320c20d, ali :  662f97d830996bc3cba760a6
// recipes => 662f98203c58681903f46271, 662f98448a2a3d8c9ed7a403
app.get('/', async (req, res) => {
    res.send("wellcome to our api ")
})

app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(globalErrorHandler);

mongoose.connect("mongodb+srv://user:user123@cluster0.rqsulab.mongodb.net/test4")
    .then(() => {
        console.log("connected to DB");
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    })
    .catch((error) => console.log(error));

