const chalk = require("chalk");
const yargs = require("yargs");

const notes = require("./notes");

//*************/ create add command ***************
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      description: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // using addNote function from "notes.js" to add note passed in CLI
    notes.addNote(argv.title, argv.body);
  },
});

//***************/ create remove command *************
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
      command: "read",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//****************/ create read command *************
yargs.command({
  command: "read",
  describe: "read a note",
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

//****************/ create list command **************
yargs.command({
  command: "list",
  describe: "list notes",
  handler() {
    console.log(chalk.yellowBright.inverse("Your Notes"));
    notes.listNotes();
  },
});

yargs.parse();
