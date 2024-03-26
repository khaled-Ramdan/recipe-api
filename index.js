import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to our api");
});

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
