require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

//get all tasks
app.get("/api/tasks", async (req, res) => {
  const results = await db.query("SELECT * FROM todo_list");
  console.log(results);
  console.log("route handler ran");
  res.status(200).json({
    status: "success",
    data: {
      list_item: ["clean cat box", "eat", "play with cats"],
    },
  });
});

//get ind task
app.get("/api/tasks/:id", (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: "success",
    data: {
      list_item: ["drink water", "eat food", "play with dogs"],
    },
  });
});

//create a task
app.post("/api/tasks", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      list_item: ["drink water", "eat food", "play with dogs"],
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
      list_item: ["drink water", "eat food", "play with dogs"],
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
