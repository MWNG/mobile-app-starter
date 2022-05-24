import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { reducers as userReducer } from "@ng-mw/shared-react-components/user"
// Put other reducers here
import appReducer from "../../modules/app/store/appReducer"

export default combineReducers({
    app: appReducer,
    form: formReducer,
    ...userReducer,
})
