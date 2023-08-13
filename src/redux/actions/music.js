import actionTypes from './actionTypes';
import * as apis from '~/services';

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

export const setWeekChart = (data) => {
    return {
        type: actionTypes.SET_WEEK_CHART,
        payload: data,
    };
};

export const deleteRecentSongs = (index) => {
    return {
        type: actionTypes.DELETE_RECENT_SONGS,
        payload: index,
    };
};

export const search = (keyWord) => async (dispatch) => {
    try {
        const response = await apis.search(keyWord);
        if (response.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                payload: response,
            });
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                payload: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            payload: null,
        });
    }
};

export const getSearchSongs = (singerId, page) => async (dispatch) => {
    dispatch({
        type: actionTypes.SET_LOADING_PAGE,
        payload: true,
    });
    try {
        const response = await apis.getArtistSongs(singerId, page);
        if (response.err === 0) {
            dispatch({
                type: actionTypes.SET_LIST_SONGS,
                payload: response?.data?.items,
            });
        } else {
            dispatch({
                type: actionTypes.SET_LIST_SONGS,
                payload: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SET_LIST_SONGS,
            payload: null,
        });
    }
    dispatch({
        type: actionTypes.SET_LOADING_PAGE,
        payload: false,
    });
};
