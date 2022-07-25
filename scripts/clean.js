const fse = require("fs-extra")
const path = require("path")

const target = process.argv[2]

switch (target) {
    case "all": {
        fse.removeSync(process.env.DEV_PATH)
        fse.removeSync(path.join(__dirname, "../dist"))
        break
    }
    case "dev": {
        fse.removeSync(process.env.DEV_PATH)
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
