import { GlobalSettings } from "@ng-mw/shared-react-components"
import { core } from "@ng-mw/shared-react-components/framework"

const query = new URLSearchParams(window.location.search.substring(1))
const envParam = parseInt(query.get("env"))
const environment = (envParam >= 0 && envParam <= 3)
    ? envParam
    : GlobalSettings.environment || core.Environment.DEVELOPMENT

const AppGlobalSettings = {
    ...GlobalSettings,
    isDebug: window.location.search.includes("debug"),
    environment,
    // Put your custom settings here
}

if (AppGlobalSettings.isDebug) {
    window._globalSettings = AppGlobalSettings
}

export default AppGlobalSettings
