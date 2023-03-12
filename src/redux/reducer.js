
const reducerFunction = (state = { theme: localStorage.getItem('theme') || 'auto' }, action) => {
    let currentState = { ...state };
    switch (action.type) {
        case 'change':
            currentState.theme = action.payload;
            break;
        default:
            break;
    }
    return currentState;
}

export default reducerFunction;