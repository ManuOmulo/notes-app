const fs = require("fs");
const chalk = require("chalk");
const { constants } = require("buffer");

// *************************** addNote Fuction *********************

const addNote = (title, body) => {
  // loading our notes from the file
  const notes = loadNotes();

  // checking if note title already exists in notes
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  // adding note to notes if title doesn't already exist
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(
      chalk.green(`New note "${chalk.yellow(title)}" has been Added`)
    );
  } else {
    console.log(
      chalk.red(`Note title "${chalk.yellow(title)}" already exists`)
    );
  }
};

// **************************** removeNote Function **************************

const removeNote = (title) => {
  const notes = loadNotes();

  // filtering notes to remain with titles that match the title passed
  const selectNote = notes.filter((note) => {
    return note.title !== title;
  });

  if (selectNote.length !== notes.length) {
    saveNotes(selectNote);
    console.log(
      chalk.green(`successfully removed note "${chalk.yellow(title)}"`)
    );
  } else {
    console.log(chalk.red(`"${chalk.yellow(title)}" note does not exist`));
  }
};

// ************************** listNotes function *************************

const listNotes = () => {
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(note.title);
  });
};

// *************************** readNote function **********************

const readNote = (title) => {
  const notes = loadNotes();

  // finding note with similar title
  const findNote = notes.find((note) => {
    return note.title === title;
  });

  if (findNote) {
    console.log(`${chalk.blue.inverse(findNote.title)} \n- ${findNote.body}`);
  } else {
    console.log(chalk.red(`"${chalk.yellow(title)}" note doesnt exist`));
  }
};

// **************************** local functions ****************************

// function for saving note to notes
const saveNotes = (array) => {
  const dataJSON = JSON.stringify(array);
  fs.writeFileSync("notes.json", dataJSON);
};

// function for loading notes from notes.json
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// exporting our functions
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
