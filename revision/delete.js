const fs = require("fs");
const chalk = require("chalk");

// *******************adding new note *************

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red(`note "${chalk.yellow(title)}" already exists`));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.bold(`"${chalk.yellow(title)}" added succefully`));
  }
};

// ***************** removing a note ***************

const removeNote = (title) => {
  const notes = loadNotes();

  const findNote = notes.filter((note) => note.title !== title);

  if (findNote.length !== notes.length) {
    saveNotes(findNote);
    console.log(chalk.green(`"${chalk.yellow(title)}" removed successfully`));
  } else {
    console.log(chalk.red(`"${chalk.yellow(title)}" not found`));
  }
};

// ***************** reading a note ******************

const readNote = (title) => {
  const notes = loadNotes();

  const findNote = notes.find((note) => note.title === title);

  if (findNote) {
    console.log(
      `Title: ${chalk.green.inverse(findNote.title)} \n ${findNote.body}`
    );
  } else {
    console.log(chalk.red(`"${chalk.yellow(title)}" not found`));
  }
};

// ****************listing all notes ***************

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse(`Your Notes`));
  notes.forEach((note) => console.log(`~ ${note.title}`));
};

// **************** local functions ****************
const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("mine.json");
    const JSONdata = buffer.toString();
    return JSON.parse(JSONdata);
  } catch {
    return [];
  }
};

const saveNotes = (note) => {
  const newNote = JSON.stringify(note);
  fs.writeFileSync("mine.json", newNote);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
  listNotes: listNotes,
};
