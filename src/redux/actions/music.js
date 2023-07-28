import actionTypes from './actionTypes';

export const setCurrentSongId = (id) => {
    return {
        type: actionTypes.SET_CURRENT_SONG_ID,
        payload: id,
    };
};

export const setPlaying = (isPlay = false) => {
    return {
        type: actionTypes.SET_PLAYING,
        payload: isPlay,
    };
};

export const setSongs = (songs) => {
    return {
        type: actionTypes.LIST_SONGS,
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
