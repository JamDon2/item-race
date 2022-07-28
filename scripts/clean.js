const fse = require("fs-extra")
const path = require("path")

if (process.argv[3] === "npm") {
    const target = process.argv[2]

    clean(target)
}

function replaceEnv(str) {
    const envKeys = Object.keys(process.env)

    for (const envKey of envKeys) {
        str = str
            .replaceAll(`%${envKey}%`, process.env[envKey])
            .replaceAll(`$${envKey}`, process.env[envKey])
    }

    return str
}

function clean(target) {
    switch (target) {
        case "all": {
            fse.removeSync(replaceEnv(process.env.DEV_PATH))
            fse.removeSync(path.join(__dirname, "../dist"))
            break
        }
        case "dev": {
            fse.removeSync(replaceEnv(process.env.DEV_PATH))
            break
        }
        case "build": {
            fse.removeSync(path.join(__dirname, "../dist"))
            break
        }
        default: {
            throw new Error("Invalid target")
        }
    }
}

module.exports.clean = clean
