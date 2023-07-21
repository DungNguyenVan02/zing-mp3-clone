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

export const setAlbum = (isAlbum) => {
    return {
        type: actionTypes.SET_ALBUM,
        payload: isAlbum,
    };
};
