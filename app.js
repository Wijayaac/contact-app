const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
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
  })
  .demandCommand();

// showing contacts list available
yargs.command({
  command: "list",
  describe: "Showing all contacts name and phone number",
  handler() {
    contacts.listContact();
  },
});

// showing contact detail search by name
yargs.command({
  command: "detail",
  describe: "Showing detail contact base on name",
  builder: {
    name: {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// deleting contact search by name
yargs.command({
  command: "delete",
  describe: "Deleting contact base on name",
  builder: {
    name: {
      describe: "Full Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
