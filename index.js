const rl = require("readline-sync");
const fs = require("fs");
const { execSync, exec, spawn, fork } = require("child_process");
const path = require("path");
const settings = require("./settings.json");
const svg2img = require("svg2img");

const directoryPath = "./extracted";

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath);
}

for (const file of fs.readdirSync(directoryPath)) {
  fs.unlinkSync(path.join(directoryPath, file));
}

const renderPath = "./geometrized";

if (!fs.existsSync(renderPath)) {
  fs.mkdirSync(renderPath);
}

for (const file of fs.readdirSync(renderPath)) {
  fs.unlinkSync(path.join(renderPath, file));
}

const resultPath = "./result";

if (!fs.existsSync(resultPath)) {
  fs.mkdirSync(resultPath);
}

for (const file of fs.readdirSync(resultPath)) {
  fs.unlinkSync(path.join(resultPath, file));
}

const inputfile = rl.question("Enter input file: ");
const outputfile = rl.question("Enter output file: ");

const inputfilesplit = path.basename(inputfile).split(".");
const convertedFile = `${inputfilesplit[0]}_c.mp4`;
execSync(
  `ffmpeg -y -i ${inputfile} -vf "scale=854:480,setsar=1:1" ./${convertedFile}`
);

execSync(
  `ffmpeg -i ${convertedFile} -filter:v fps=${settings.fps} ./extracted/%08d.png`
);

function splitArray(array, X) {
  const length = array.length;
  const partSize = Math.floor(length / X);
  const remainder = length % X;

  const parts = [];
  let index = 0;
  for (let i = 0; i < X; i++) {
    const part = array.slice(index, index + partSize);
    parts.push(part);
    index += partSize;
  }

  if (remainder > 0) {
    parts.push(array.slice(-remainder));
  }

  return parts;
}
console.log();

var total = 0;

const files = fs.readdirSync(directoryPath);

var goal = files.length;

process.stdout.write(total + "/" + goal + "\r");

async function runWorker(files, i) {
  return new Promise((resolve, reject) => {
    var a = fork(`worker.js`);
    a.on("message", (msg) => {
      total++;
      process.stdout.write(total + "/" + goal + "\r");
      if (msg == "done") {
        resolve("worker" + i + " done");
      }
    });
    a.send(files);
  });
}

const splitFiles = splitArray(files, settings.workers);

async function work() {
  await Promise.all([...splitFiles.map((f, i) => runWorker(f, i))]);

  const opts = {
    background: "#000",
    fitTo: {
      mode: "width",
      value: 1920,
    },
  };

  const convertedFiles = fs.readdirSync(renderPath);

  convertedFiles.forEach((file) => {
    const filePath = path.join(renderPath, file);
    console.log(filePath);
    const fileName = path.basename(filePath).split(".")[0];
    const outPath = path.join(resultPath, fileName.replace(".svg", ""));

    svg2img(
      fs.readFileSync(filePath),
      {
        resvg: {
          background: "#000",
          fitTo: {
            mode: "width",
            value: 1920,
          },
        },
      },
      function (error, buffer) {
        //returns a Buffer
        fs.writeFileSync(outPath + ".png", buffer);
      }
    );
  });

  execSync(
    `ffmpeg -y -framerate ${settings.fps} -i result/%08d.png ${outputfile}`
  );

  console.log("Finished!");

  process.exit();
}

work();
