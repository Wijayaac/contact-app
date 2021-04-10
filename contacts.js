const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// creating data folder
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// creating file contacts.json if not exists
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const saveContact = (name, email, number) => {
  const contact = { name, email, number };
  const contacts = loadContact();

  //   check name, if the name already registered don't add new contact
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold(
        "Contact already registered, hint: use another name!"
      )
    );
    return false;
  }

  //   check email is  a valid mail
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Email not valid, hint: use a valid email!")
      );
      return false;
    }
  }

  //   check phone number, just ID number allowed
  if (!validator.isMobilePhone(number, "id-ID")) {
    console.log(
      chalk.red.inverse.bold(
        "Phone number is not valid, hint: use a valid ID mobile phone number!"
      )
    );
    return false;
  }
  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(
    chalk.green.inverse.italic.bold("Terimakasih sudah memasukkan data")
  );
};

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// showing contact list
const listContact = () => {
  const contacts = loadContact();

  console.log(chalk.cyan.inverse.italic.bold("Contact List : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.number}`);
  });
};

// showing detail contact
const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${name} not available`));
    return false;
  }

  console.log(chalk.cyan.inverse.italic.bold(contact.name));
  console.log(contact.number);
  if (contact.email) {
    console.log(contact.email);
  }
};

// deleting contact
const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${name} not available`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.italic.bold(`${name} successfully deleted`));
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
