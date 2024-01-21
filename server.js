require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());

app.use(cors());

//get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//get ind task
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const results = await db.query("SELECT* FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    res.status(201).json(results);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//create a task
app.post("/api/tasks", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO tasks (name, description, due_date, urgency) VALUES ($1, $2,$3, $4) RETURNING *",
      [req.body.name, req.body.description, req.body.due_date, req.body.urgency]
    );
    res.status(201).json(req.body);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

//update
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE tasks SET name = $1, description = $2, due_date = $3, urgency = $4 WHERE id = $5 RETURNING *",
      [
        req.body.name,
        req.body.description,
        req.body.due_date,
        req.body.urgency,
        req.params.id,
      ]
    );

    res.status(200).json({
      status: "success",
      data: {
        task: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete
delete app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM tasks WHERE id = $1", [
      req.params.id,
    ]);

    res.status(201).json();
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Yer server be afloat and keenly listenin' on the port", port);
});
