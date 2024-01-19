require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

//get all tasks
//WORKS SUCCESSFULLY, TESTED ON POSTMAN
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.status(200).json(result);
    console.log("Ye route be handled successfully", result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//get ind task
//WORKS SUCCESSFULLY, TESTED ON POSTMAN
app.get("/api/tasks/:id", async (req, res) => {
  console.log("el id", req.params.id);

  try {
    const results = await db.query("SELECT* FROM tasks WHERE task_id = $1", [
      req.params.id,
    ]); //should this be id or task id? -pretty sure id. did console.log test and task_id comes up undefined
    res.status(201).json(results.id);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//create a task
app.post("/api/tasks", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO tasks (name, description, due_date, urgency) VALUES ($1, $2,$3, $4) RETURNING *",
      [req.body.name, req.body.description, req.body.due_date, req.body.urgency]
    );
    console.log(results);
    res.status(201).json(req.body);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
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
