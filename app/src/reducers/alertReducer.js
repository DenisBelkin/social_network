const alertReducer = (state = {show:false}, action) => {
    switch (action.type) {
        case 'TOGGLE_ALERT':
            const key = action.payload.key;
            console.log(payload)
            console.log(action)
            return {...state, [key]: action.payload.value};
        default:
            return {...state};
    }
};

export default alertReducer;