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
//WORKS SUCCESSFULLY, TESTED ON POSTMAN
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
//successfully pulling data from here to postman, but not seeing anything different in my postgres table
//I am getting updates to my get all request in postman though
//pause for now and come back to later
//I dont think my thing is properly hooked up to postgreqsl?
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
  console.log(req.params.id);
  console.log(req.body);
});

// delete app.delete("/api/tasks/:id", (req, res) => {
//   res.status(204).json({
//     status: "success",
//   });
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Yer server be afloat and keenly listenin' on the port", port);
});
