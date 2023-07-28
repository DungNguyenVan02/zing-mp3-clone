import actionTypes from '../actions/actionTypes';
const initState = {
    currentSongId: null,
    songs: [],
    isPlaying: false,
    isLoading: true,
    volume: 70,
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
        case actionTypes.LIST_SONGS:
            return {
                ...state,
                songs: action.payload,
            };
        case actionTypes.SET_LOADING_SONG:
            return {
                ...state,
                isLoading: action.payload,
            };
        case actionTypes.SET_VOLUME:
            return {
                ...state,
                volume: action.payload,
            };
        default:
            return state;
    }
}

export default musicSlice;
