require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

//get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.json(result);
    console.log("Ye route be handled successfully", result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//get ind task
app.get("/api/tasks/:id", (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: "success",
    data: {
      task_id: 1,
      name: "Sample Task",
      description: "Description of the task",
      completed: false,
      due_date: "2024-02-01",
      urgency: "High",
    },
  });
});

//create a task
app.post("/api/tasks", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      task_id: 1,
      name: "Sample Task",
      description: "Description of the task",
      completed: false,
      due_date: "2024-02-01",
      urgency: "High",
    },
  });
});

// update
app.put("/api/tasks/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      task_id: 1,
      name: "Sample Task",
      description: "Description of the task",
      completed: false,
      due_date: "2024-02-01",
      urgency: "High",
    },
  });
});

// delete
app.delete("/api/tasks/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Yer server be afloat and keenly listenin' on the port", port);
});
