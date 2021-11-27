import * as actionTypes from "../../actions/BackOffices/actionTypes"

const initialState = {
    sidebarShow: 'responsive'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET :
            return {...state,sidebarShow:action.sidebarShow }
        default:
            return state
    }
}

export default reducer
