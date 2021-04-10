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
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

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

module.exports = { saveContact };
