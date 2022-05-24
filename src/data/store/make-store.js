import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from "redux-logger"
import reduxPromise from "redux-promise"
import thunkMiddleware from "redux-thunk"
import rootReducer from "./all-reducers"

export default () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                reduxPromise,
                createLogger({ collapsed: true }),
            ),
        ),
    )

    return store
}
