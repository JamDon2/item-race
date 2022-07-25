const fs = require("fs")
const path = require("path")

const package = require("../package.json")
const info = require("../src/info.json")

info.version = package.version

fs.writeFileSync(path.join(__dirname, "../src/info.json"), JSON.stringify(info))
