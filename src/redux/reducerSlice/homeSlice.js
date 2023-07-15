import actionTypes from '../actions/actionTypes';
const initState = {
    banners: [],
    isOpenSidebar: false,
};
function homeSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.banners,
            };
        case actionTypes.SET_OPEN_SIDE_BAR_RIGHT:
            return {
                ...state,
                isOpenSidebar: action.payload,
            };
        default:
            return state;
    }
}

export default homeSlice;
