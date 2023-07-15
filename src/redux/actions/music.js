import actionTypes from './actionTypes';

export const setCurrentSongId = (id) => {
    return {
        type: actionTypes.SET_CURRENT_SONG_ID,
        payload: id,
    };
};
