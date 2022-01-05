/* eslint-disable */
import fs from "fs";
import Path from "path";
/* eslint-enable */

const fileName = Path.join(__dirname, "../", "package.json")

const file = fs.readFileSync(fileName);
const args = process.argv.slice(2)

for (let arg = 0, l = args.length; arg < l; arg++) {
  if (arg % 2 === 0) {
    file[args[arg]] = args[arg + 1]
  }
}

fs.writeFile(
  Path.join(__dirname, fileName),
  JSON.stringify(file, null, 2),
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log("Writing to " + fileName)
  }
)
