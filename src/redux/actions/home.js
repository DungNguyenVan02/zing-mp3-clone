import actionTypes from './actionTypes';
import * as apis from '~/services';

export const getHome = () => async (dispatch) => {
    try {
        const responsive = await apis.homeService();
        if (responsive?.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                payload: responsive?.data?.items,
            });
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                payload: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            payload: null,
        });
    }
};

export const setOpenSidebar = (isOpen) => {
    return {
        type: actionTypes.SET_OPEN_SIDE_BAR_RIGHT,
        payload: isOpen,
    };
};

export const setLoadingPage = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING_PAGE,
        payload: isLoading,
    };
};
