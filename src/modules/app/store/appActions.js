import { userActions } from "@ng-mw/shared-react-components/user"

export const loadAuthedBaseData = () => {
    return async dispatch => {
        // Put the actions you want to perform when the user has logged in here
    }
}

export const resetAuthedBaseData = () => {
    return async dispatch => {
        // Put the actions you want to perform when the user has logged out here
    }
}

export const setToken = (token = "", isInitialLogin = false) => {
    return async dispatch => {
        try {
            if (token) {
                await dispatch(userActions.setToken(token, isInitialLogin))
                await dispatch(loadAuthedBaseData())
            } else {
                dispatch(userActions.logOut())
            }
        } catch (e) {
            // swallow
        }
    }
}

export const {
    ChangeTrigger,
    logOut,
    extendedUserHasChanged,
} = userActions
