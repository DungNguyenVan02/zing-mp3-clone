import routes from '~/config/routes';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import NewMusic from '~/pages/NewMusic';
import Radio from '~/pages/Radio';
import Top100 from '~/pages/Top100';
import Album from '~/pages/Album';
import WeekRank from '~/pages/WeekRank';
import ZingChart from '~/pages/ZingChart';
import Search from '~/pages/Search';
import SearchSongs from '~/pages/SearchSongs';
import SearchAll from '~/pages/SearchAll';
import SearchPlaylist from '~/pages/SearchPlaylist';
import Singer from '~/pages/Singer';

const publicRoutes = [
    {
        path: routes.home,
        component: Home,
    },
    {
        path: routes.myMusic,
        component: MyMusic,
    },
    {
        path: routes.newMusic,
        component: NewMusic,
    },
    {
        path: routes.radio,
        component: Radio,
    },
    {
        path: routes.top100,
        component: Top100,
    },
    {
        path: routes.album,
        component: Album,
    },
    {
        path: routes.playlist,
        component: Album,
    },
    {
        path: routes.weekRank,
        component: WeekRank,
    },
    {
        path: routes.zingChart,
        component: ZingChart,
    },
    {
        path: routes.search,
        component: Search,
    },
    {
        path: routes.searchSongs,
        component: SearchSongs,
    },
    {
        path: routes.searchAll,
        component: SearchAll,
    },
    {
        path: routes.searchPlaylist,
        component: SearchPlaylist,
    },
    {
        path: routes.singer,
        component: Singer,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
