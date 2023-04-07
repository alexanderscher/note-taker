const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

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

notes.delete("/", (req, res) => {});

module.exports = notes;
