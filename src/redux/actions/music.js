import actionTypes from './actionTypes';

export const setCurrentSongId = (id) => {
    return {
        type: actionTypes.SET_CURRENT_SONG_ID,
        payload: id,
    };
};

export const setCurrentAlbumId = (id) => {
    return {
        type: actionTypes.SET_CURRENT_ALBUM_ID,
        payload: id,
    };
};

export const setPlaying = (isPlay = false) => {
    return {
        type: actionTypes.SET_PLAYING,
        payload: isPlay,
    };
};

export const setPlayingRandom = (isPlay = false) => {
    return {
        type: actionTypes.SET_PLAYING_RAND,
        payload: isPlay,
    };
};

export const setSongs = (songs) => {
    return {
        type: actionTypes.SET_LIST_SONGS,
        payload: songs,
    };
};

export const setVolumeSong = (volume) => {
    return {
        type: actionTypes.SET_VOLUME,
        payload: volume,
    };
};

export const setIsLoading = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING_SONG,
        payload: isLoading,
    };
};

export const setCurrentSongData = (data) => {
    return {
        type: actionTypes.SET_CURRENT_SONG_DATA,
        payload: data,
    };
};

export const setRecentSongs = (data) => {
    return {
        type: actionTypes.SET_RECENT_SONGS,
        payload: data,
    };
};

export const deleteRecentSongs = (index) => {
    return {
        type: actionTypes.DELETE_RECENT_SONGS,
        payload: index,
    };
};
