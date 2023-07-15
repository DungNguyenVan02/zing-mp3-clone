import actionTypes from '../actions/actionTypes';
const initState = {
    currentSongId: null,
};
function musicSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.payload || null,
            };
        default:
            return state;
    }
}

export default musicSlice;
