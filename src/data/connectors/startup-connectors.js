import { App, LocalStorage, Connectivity } from "@ng-mw/shared-react-components"
import { core } from "@ng-mw/shared-react-components/framework"
import { userSetup } from "@ng-mw/shared-react-components/user"
import { nativeActions } from "@ng-mw/shared-app-components"
import { NativeEventBridge } from "@ng-mw/shared-react-components"
import frameworkConnectors from "./framework-connectors"
import AppGlobalSettings from "../AppGlobalSettings"
import NativeEvent from "../NativeEvent"
import WebAppEvent from "../WebAppEvent"
import fontLoader from "../font-loader"
import { setToken } from "../../modules/app/store/appActions"

// DEBUG: Set NativeEventBridge in browser
/*
window.NativeEventBridge = NativeEventBridge
window.NativeEvent = NativeEvent
//*/

const token = LocalStorage.get(App.LocalStorage.UserToken)

export default async store => {

    // lets go easy on the logging fwrk
    core.LoggerConfig.turnOffAllFrameworkLoggers()

    // network status watcher
    store.dispatch(nativeActions.setNetworkStatus(Connectivity.status))

    Connectivity.watch(status => {
        store.dispatch(nativeActions.setNetworkStatus(status))
    })

    // listen for safe areas
    // and trigger ready to recieve them
    NativeEventBridge.listen(NativeEvent.AppSafeArea, safeArea => {
        store.dispatch(nativeActions.setSafeArea(safeArea))
    })
    // DEBUG: Set safe area
    /*
    store.dispatch(nativeActions.setSafeArea({ top: 32, bottom: 32 }))
    //*/
    NativeEventBridge.broadcastNative(NativeEvent.ReadyForSafeArea)

    // set framework setup up (sync)
    core.setup({
        apiKey: AppGlobalSettings.apiKey,
        chainId: AppGlobalSettings.chainId,
        environment: AppGlobalSettings.environment,
        apiBaseUrl: AppGlobalSettings.apiBaseUrl,
    })

    // Must be setup before setting token
    userSetup(store)

    // if token, then log in, and load base data
    if (token) {
        await store.dispatch(setToken(token, true))
    } else {
        // Put the action you want to perform when the user isn't logged in here
    }

    await Promise.all([
        frameworkConnectors(store),
        fontLoader(),
    ])

    NativeEventBridge.broadcastWeb(WebAppEvent.ReactCanMount)
}
