const settings = require("./settings.json");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const directoryPath = "./extracted";

process.on("message", (files) => {
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    const fileName =
      "./geometrized/" + path.basename(filePath).split(".")[0] + ".svg";

    execSync(
      `GeometrizeCli -i ./${filePath} -o ${fileName} -t ${settings.shapes} -s ${settings.shapeAmount} -c ${settings.candidates} -m ${settings.mutations} -a ${settings.alpha}`
    );

    process.send(1);
  });

  process.send("done");
});
