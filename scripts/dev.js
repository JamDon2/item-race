const spawn = require("cross-spawn")
const fse = require("fs-extra")

function replaceEnv(str) {
    const envKeys = Object.keys(process.env)

    for (const envKey of envKeys) {
        str = str
            .replaceAll(`%${envKey}%`, process.env[envKey])
            .replaceAll(`$${envKey}`, process.env[envKey])
    }

    return str
}

const buildDir = replaceEnv(process.env.DEV_PATH)

spawn("npx", ["tstl", "-outDir", buildDir])

fse.copySync("src/", buildDir, {
    filter: file => !file.endsWith(".ts"),
})
