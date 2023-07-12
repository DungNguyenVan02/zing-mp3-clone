import actionTypes from '../actions';
const initState = {
    homeData: [1, 2, 3],
};
function reducerSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return;
        default:
            return state;
    }
}

export default reducerSlice;
