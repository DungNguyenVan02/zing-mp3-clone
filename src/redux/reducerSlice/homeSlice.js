import actionTypes from '../actions/actionTypes';
const initState = {
    banners: [],
    editorTheme1: {},
    isOpenSidebar: false,
};
function homeSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.payload.find((item) => item.sectionId === 'hSlider').items || null,
                editorTheme1: action.payload.find((item) => item.sectionId === 'hEditorTheme') || {},
            };
        case actionTypes.SET_OPEN_SIDE_BAR_RIGHT:
            return {
                ...state,
                isOpenSidebar: action.payload,
            };
        default:
            return state;
    }
}

export default homeSlice;
