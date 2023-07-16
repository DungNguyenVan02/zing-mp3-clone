import actionTypes from '../actions/actionTypes';
const initState = {
    currentSongId: null,
    isPlaying: false,
};
function musicSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.payload || null,
            };
        case actionTypes.SET_PLAYING:
            return {
                ...state,
                isPlaying: action.payload,
            };
        default:
            return state;
    }
}

export default musicSlice;