const { server } = require("@ng-mw/shared-webapp-server")
const { version } = require("./package.json")

const instance = server(version, __dirname, "trumf")
