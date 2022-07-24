const spawn = require("cross-spawn")
const fs = require("fs")
const fse = require("fs-extra")
const archiver = require("archiver")

const package = require("../package.json")

spawn("npx", ["tstl", "-outDir", `dist/${package.name}_${package.version}`])

const buildDir = `dist/${package.name}_${package.version}`

fse.copySync("src/", buildDir, {
    filter: file => !file.endsWith(".ts"),
})

const output = fs.createWriteStream(buildDir + ".zip")

const archive = archiver("zip")

archive.pipe(output)

archive.directory(buildDir, `${package.name}_${package.version}`)

archive.finalize()
