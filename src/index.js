import "./index.scss"
import "./resources/resources"

import "core-js/stable"
import "regenerator-runtime/runtime"

import inlineSvg from "@ng-mw/reol/utils/inlineSvg"
import { NativeEventBridge } from "@ng-mw/shared-react-components"
import React from "react"
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import AppGlobalSettings from "./data/AppGlobalSettings"
import startupConnectors from "./data/connectors/startup-connectors"
import lifecycleConnectors from "./data/connectors/lifecycle-connectors"
import PathNames from "./modules/app/const/PathNames"
import WebAppEvent from "./data/WebAppEvent"
import makeStore from "./data/store/make-store"

// Components
import { ErrorBoundary } from "@ng-mw/shared-app-components"
import App from "./modules/app/App"

const store = makeStore()

const history = createMemoryHistory({
    initialEntries: [PathNames.Home],
    initialIndex: 0,
})

startupConnectors(store)
lifecycleConnectors(store)

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

NativeEventBridge.listen(WebAppEvent.ReactCanMount, () => {
    root.render(
        <ErrorBoundary>
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </ErrorBoundary>
    )
})

inlineSvg(AppGlobalSettings.inlineIconSetUrl)
