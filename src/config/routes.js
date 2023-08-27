const routes = {
    home: '/',
    myMusic: '/my-music',
    myMusicSong: '/my-music/song',
    myMusicPlaylist: '/my-music/playlist',
    newRelease: '/moi-phat-hanh',
    top100: '/top100',
    album: '/album/:title/:id',
    playlist: '/playlist/:title/:id',
    weekChart: '/zing-chart-tuan/:title/:id',
    zingChart: '/zing-chart',
    search: '/tim-kiem',
    searchSongs: '/tim-kiem/bai-hat/:keywords',
    searchAll: '/tim-kiem/tat-ca/:keywords',
    searchPlaylist: '/tim-kiem/playlist/:keywords',
    singer: '/:singer',
    artistSinger: '/nghe-si/:singer',
};
export default routes;
