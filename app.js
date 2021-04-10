const { askQuestions, saveContact } = require("./contacts");

// main method for input data
const main = async () => {
  const name = await askQuestions("Masukkan nama anda : ");
  const email = await askQuestions("Masukkan email anda : ");
  const number = await askQuestions("Masukkan nomor anda : ");

  saveContact(name, email, number);
};

main();
