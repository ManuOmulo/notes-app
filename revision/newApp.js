const yargs = require("yargs");
const chalk = require("chalk");

const notes = require("./delete");

// ****** create add command *****
yargs.command({
  command: "add",
  describe: "adding new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//************/ create remove command ******
yargs.command({
  command: "remove",
  describe: "removing note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// *************** create read command **********
yargs.command({
  command: "read",
  describe: "reading from a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// ****************create list command **************
yargs.command({
  command: "list",
  describe: "listing all the note titles",
  handler() {
    notes.listNotes();
  },
});

yargs.parse();
