const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan nama anda : ", (nama) => {
  rl.question("Masukkan nomor telepon : ", (nomor) => {
    const contact = { nama, nomor };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    console.log("Terimakasih sudah memasukkan data");
    rl.close();
  });
});
// write string into a file using synchronous method
// try {
//   fs.writeFileSync("data/test.txt", "Wijaya - 089655771793");
// } catch (error) {
//   console.error(error);
// }

// write string into a file using asynchcronous method

// fs.writeFile("data/test.txt", "089655771793 - Wijaya", (e) => {
//   console.log(e);
// });

// read file content using synchronous method
// const data = fs.readFileSync("data/test.txt", "utf-8");
// fs.readFile("data/test.txt", "utf-8", (e, data) => {
//   if (e) throw e;
//   console.log(data);
// });
