import actionTypes from '../actions/actionTypes';
const initState = {
    banners: [],
    editorTheme1: {},
    editorTheme2: {},
    editorTheme3: {},
    editorTheme4: {},
    editorTheme5: {},
    editorTheme6: {},
    editorTheme7: {},
    editorTheme8: {},
    editorTheme9: {},
    editorTheme10: {},
    editorTheme11: {},
    chart: {},
    rank: [],
    user: null,
    isOpenSidebar: false,
    isOpenPopup: false,
    isLoadingPage: false,
};
function homeSlice(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.payload?.find((item) => item.sectionId === 'hSlider').items || null,
                editorTheme1: action.payload?.find((item) => item.sectionType === 'new-release') || {},
                editorTheme2: action.payload?.find((item) => item.sectionId === 'hEditorTheme') || {},
                editorTheme3: action.payload?.find((item) => item.sectionId === 'hEditorTheme2') || {},
                editorTheme4: action.payload?.find((item) => item.sectionId === 'hEditorTheme3') || {},
                editorTheme5: action.payload?.find((item) => item.sectionId === 'hEditorTheme4') || {},
                editorTheme6: action.payload?.find((item) => item.sectionId === 'hArtistTheme') || {},
                editorTheme7: action.payload?.find((item) => item.sectionId === 'hNewrelease') || {},
                editorTheme8: action.payload?.find((item) => item.sectionType === 'weekChart') || {},
                editorTheme9: action.payload?.find((item) => item.sectionId === 'h100') || {},
                editorTheme10: action.payload?.find((item) => item.sectionId === 'hAlbum') || {},
                editorTheme11: action.payload?.find((item) => item.sectionId === 'hLiveRadio') || {},
                chart: action.payload?.find((item) => item.sectionId === 'hZC').chart || {},
                rank: action.payload?.find((item) => item.sectionId === 'hZC').items || [],
            };
        case actionTypes.SET_OPEN_SIDE_BAR_RIGHT:
            return {
                ...state,
                isOpenSidebar: action.payload,
            };
        case actionTypes.SET_OPEN_POPUP:
            return {
                ...state,
                isOpenPopup: action.payload,
            };
        case actionTypes.SET_LOADING_PAGE:
            return {
                ...state,
                isLoadingPage: action.payload,
            };
        case actionTypes.SET_USER_LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}

export default homeSlice;
