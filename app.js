const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
  command: "add",
  describe: "Adding new contact",
  builder: {
    name: {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
    number: {
      describe: "Phone number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.saveContact(argv.name, argv.email, argv.number);
  },
});

yargs.parse();
