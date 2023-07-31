import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import NewMusic from '~/pages/NewMusic';
import Radio from '~/pages/Radio';
import Top100 from '~/pages/Top100';
import Album from '~/pages/Album';
import WeekRank from '~/pages/WeekRank';
import ZingChart from '~/pages/ZingChart';

const config = {
    home: {
        component: Home,
        path: '/',
    },
    myMusic: {
        component: MyMusic,
        path: '/my-music',
    },
    newMusic: {
        component: NewMusic,
        path: '/new-music',
    },
    radio: {
        component: Radio,
        path: '/radio',
    },
    top100: {
        component: Top100,
        path: '/top-100-music',
    },
    album: {
        component: Album,
        path: '/album/:title/:id',
    },
    playlist: {
        component: Album,
        path: '/playlist/:title/:id',
    },
    weekRank: {
        component: WeekRank,
        path: '/zing-chart-tuan/:title/:id',
    },
    zingChart: {
        component: ZingChart,
        path: '/zing-chart',
    },
};
export default config;
