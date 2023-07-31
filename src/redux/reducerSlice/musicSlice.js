import actionTypes from '../actions/actionTypes';
const initState = {
    currentSongId: null,
    currentSongData: null,
    currentAlbumId: null,
    songs: [],
    recentSongs: [],
    isPlaying: false,
    isPlayingRandom: false,
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
        case actionTypes.SET_CURRENT_ALBUM_ID:
            return {
                ...state,
                currentAlbumId: action.payload || null,
            };
        case actionTypes.SET_PLAYING:
            return {
                ...state,
                isPlaying: action.payload,
            };
        case actionTypes.SET_LIST_SONGS:
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
        case actionTypes.SET_PLAYING_RAND:
            return {
                ...state,
                isPlayingRandom: action.payload,
            };
        case actionTypes.SET_CURRENT_SONG_DATA:
            return {
                ...state,
                currentSongData: action.payload,
            };
        case actionTypes.SET_RECENT_SONGS:
            let songs = state.recentSongs;
            const checkSongs = songs?.some((item) => item?.encodeId === action.payload?.encodeId);
            if (!checkSongs) {
                if (songs.length > 15) {
                    songs.splice(songs.length - 1, 1);
                }
                songs = [action.payload, ...songs];
            }
            return {
                ...state,
                recentSongs: songs,
                // recentSongs: [action.payload, ...state.recentSongs],
            };
        default:
            return state;
    }
}

export default musicSlice;
