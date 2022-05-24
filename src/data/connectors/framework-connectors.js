import { core } from "@ng-mw/shared-react-components/framework"
import { extendedUserHasChanged, resetAuthedBaseData, ChangeTrigger } from "../../modules/app/store/appActions"

export default store => {
    core.MessageBroker.registerListener(
        core.PredefinedMessageTopics.EXTENDED_USER_HAS_CHANGED_LOCALLY,
        message => store.dispatch(extendedUserHasChanged(ChangeTrigger.Local, message.data)),  // data = prefferedStoreDidChange
    )
    core.MessageBroker.registerListener(
        core.PredefinedMessageTopics.EXTENDED_USER_HAS_CHANGED,
        message => store.dispatch(extendedUserHasChanged(ChangeTrigger.Sync, message.data)),   // data = prefferedStoreDidChange
    )
    core.MessageBroker.registerListener(
        core.PredefinedMessageTopics.LOGOUT_COMPLETE,
        () => store.dispatch(resetAuthedBaseData()),
    )
}
