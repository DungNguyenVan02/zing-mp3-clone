import actionTypes from './actionTypes';
import * as apis from '~/services';

export const getHome = () => async (dispatch) => {
    try {
        const responsive = await apis.homeService();
        if (responsive?.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                banners: responsive?.data?.items.find((item) => item.sectionType === 'banner').items || null,
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
