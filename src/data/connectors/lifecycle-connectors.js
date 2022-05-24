import { LifecycleEmitter, LifecycleEvent } from "@ng-mw/shared-react-components"
import { loadAuthedBaseData, } from "../../modules/app/store/appActions"

export default async store => {
    LifecycleEmitter.on(LifecycleEvent.UserLoggedIn, async ({ isInitalLogin }) => {
        // To avoid double loading of data on startup,
        // ignore login triggered by start up connector setToken
        if (!isInitalLogin) {
            await store.dispatch(loadAuthedBaseData())
        }
    })
}
