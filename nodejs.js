const fs = require("fs");
const { exec } = require("child_process");

fs.writeFile("test.txt", "Neki tekst", (err) => {
  if (err) throw err;
  console.log("Fajl uspesno kreiran.");

  exec("ls -a", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`Fajlovi u trenutnom direktorijumu: ${stdout}`);
  });
});

// fs sam koristio za upload, ali nikad u ovom kontekstu. Ovo je prvi put da koristim exec.

// HTTPS request

const https = require("https");

https
  .get("https://reqres.in/api/users?page=2", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const users = JSON.parse(data).data;
      const names = users.map((user) => `${user.first_name}, ${user.last_name}`);
      console.log(names.join("\n"));
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
