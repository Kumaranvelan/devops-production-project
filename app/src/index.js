const express = require("express");
const mongoose = require("mongoose");

const healthRoute = require("./routes/health");
const tasksRoute = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use("/health", healthRoute);
app.use("/tasks", tasksRoute);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/devopsdb";

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));