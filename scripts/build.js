const spawn = require("cross-spawn")
const fs = require("fs")
const fse = require("fs-extra")
const archiver = require("archiver")
const path = require("path")
require("./sync_version")

const package = require("../package.json")

const buildDir = path.join(
    __dirname,
    `../dist/${package.name}_${package.version}`
)

spawn.sync("npx", ["tstl", "-outDir", buildDir])

fse.copySync("src/", buildDir, {
    filter: file => !file.endsWith(".ts"),
})

const output = fs.createWriteStream(buildDir + ".zip")

const archive = archiver("zip")

archive.pipe(output)

archive.directory(buildDir, `${package.name}_${package.version}`)

archive.finalize()
