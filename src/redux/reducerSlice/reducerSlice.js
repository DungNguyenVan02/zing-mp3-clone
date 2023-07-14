import actionTypes from '../actions/actionTypes';
const initState = {
    banners: [],
};
function reducerSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.banners,
            };
        default:
            return state;
    }
}

export default reducerSlice;
