const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
    res.json(tasks);
});

router.post("/", (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };

    tasks.push(task);

    res.status(201).json(task);
});

router.delete("/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;