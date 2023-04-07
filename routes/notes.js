const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, "./db/db.json");
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

notes.delete("/:id", (req, res) => {
  const noteJson = require("../db/db.json");
  const id = req.params.id;
  const updatedNotes = noteJson.filter((n) => n.id !== id);
  writeToFile("./db/db.json", updatedNotes);
  res.send("Note deleted successfully");
});

module.exports = notes;
