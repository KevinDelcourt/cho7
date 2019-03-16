export const msgAction = (msg) => {return {
    type: "msg",
    payload: msg
}}

let defaultState = { msg: "" }
export const msgReducer = (state = defaultState, action) => {
    if(action.type === "msg")
        return {...state, msg: action.payload}

    return state
}