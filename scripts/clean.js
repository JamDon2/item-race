const fse = require("fs-extra")

const target = process.argv[2]

switch (target) {
    case "all": {
        fse.removeSync(process.env.DEV_PATH)
        fse.removeSync("dist")
        break
    }
    case "dev": {
        fse.removeSync(process.env.DEV_PATH)
        break
    }
    case "build": {
        fse.removeSync("dist")
        break
    }
    default: {
        throw new Error("Invalid target")
    }
}
