import config from '~/config/routes';

const publicRoutes = [
    {
        path: config.home.path,
        component: config.home.component,
    },
    {
        path: config.myMusic.path,
        component: config.myMusic.component,
    },
    {
        path: config.newMusic.path,
        component: config.newMusic.component,
    },
    {
        path: config.radio.path,
        component: config.radio.component,
    },
    {
        path: config.top100.path,
        component: config.top100.component,
    },
    {
        path: config.album.path,
        component: config.album.component,
    },
    {
        path: config.playlist.path,
        component: config.playlist.component,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
