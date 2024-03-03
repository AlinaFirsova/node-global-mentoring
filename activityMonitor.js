const childProcess = require("child_process");
const os = require("os");
const fs = require("fs");

const WINDOWS_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const UNIX_COMMAND = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

const isWindows = os.type() === "Windows_NT";
const command = isWindows ? WINDOWS_COMMAND : UNIX_COMMAND;

setInterval(
  () =>
    childProcess.exec(command, (error, result) => {
      console.clear();
      if (error) {
        console.log(`\x1b[31mERROR! ${error} \x1b[0m`);
      } else {
        console.log(result);
      }
    }),
  100
);

setInterval(
  () =>
    childProcess.exec(command, (error, result) => {
      console.clear();
      if (error) {
        console.log(`\x1b[31mERROR! ${error} \x1b[0m`);
      } else {
        fs.appendFile(
          "activityMonitor.log",
          `${Math.floor(Date.now() / 1000)} : ${result}`,
          (error) => {
            if (error) {
              console.log(`\x1b[31mERROR! Failed to write: ${error} \x1b[0m`);
            }
          }
        );
      }
    }),
  1000
);
