const csv = require("csvtojson");
const { pipeline } = require("stream");
const { createReadStream, createWriteStream } = require("fs");

pipeline(
  createReadStream("./csv/data.csv"),
  csv({ delimiter: ";" }),
  createWriteStream("task3Result.txt"),
  (error) =>
    console.log(
      error ? `ERROR OCURED: ${error}` : "FILE WAS PARSED SUCCESSFULLY"
    )
);
