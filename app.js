const fs = require("fs");
const { resolve } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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

const askName = () => {
  return new Promise((resolve, reject) => {
    rl.question("Masukkan nama anda : ", (name) => {
      resolve(name);
    });
  });
};
// const askNumber = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Masukkan nomor telepon anda : ", (number) => {
//       resolve(number);
//     });
//   });
// };
const askEmail = () => {
  return new Promise((resolve, reject) => {
    rl.question("Masukkan email anda : ", (email) => {
      resolve(email);
    });
  });
};

const main = async () => {
  const name = await askName();
  //   const number = await askNumber();
  const email = await askEmail();

  const contact = { name, email };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log("Terimakasih sudah memasukkan data");
  rl.close();
};

main();
// prompting input data using CLI
// rl.question("Masukkan nama anda : ", (nama) => {
//   rl.question("Masukkan nomor telepon : ", (nomor) => {
//     const contact = { nama, nomor };
//     const file = fs.readFileSync("data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file);

//     contacts.push(contact);
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//     console.log("Terimakasih sudah memasukkan data");
//     rl.close();
//   });
// });
