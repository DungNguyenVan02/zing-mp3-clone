export const bannerSelector = (state) => state.home.banners;

//music
export const currentSongSelector = (state) => state.music.currentSongId;
export const playingSongSelector = (state) => state.music.isPlaying;

//sidebar right
export const openSidebarSelector = (state) => state.home.isOpenSidebar;
