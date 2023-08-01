import actionTypes from '../actions/actionTypes';
const initState = {
    currentSongId: null,
    currentSongData: null,
    currentAlbumId: null,
    songs: [], //Danh sách có nhạc vip
    songsBasics: [], //Danh sách nhạc không cần vip
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
            const filterSongBasic = [];
            action.payload.forEach((song) => {
                if (song.isWorldWide === true) {
                    filterSongBasic.push(song);
                }
            });
            return {
                ...state,
                songs: action.payload,
                songsBasics: filterSongBasic,
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
            };
        case actionTypes.DELETE_RECENT_SONGS:
            console.log(action.payload);
            let newRecentSong = state.recentSongs;
            newRecentSong.splice(action.payload, 1);
            return {
                ...state,
                recentSongs: newRecentSong,
            };
        default:
            return state;
    }
}

export default musicSlice;
