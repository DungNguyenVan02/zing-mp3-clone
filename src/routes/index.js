import routes from '~/config/routes';
import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import NewRelease from '~/pages/NewRelease';
import Top100 from '~/pages/Top100';
import Album from '~/pages/Album';
import WeekChart from '~/pages/WeekChart';
import ZingChart from '~/pages/ZingChart';
import Search from '~/pages/Search';
import SearchSongs from '~/pages/SearchSongs';
import SearchAll from '~/pages/SearchAll';
import SearchPlaylist from '~/pages/SearchPlaylist';
import Singer from '~/pages/Singer';
import Chill from '~/pages/Chill';

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
        path: routes.newRelease,
        component: NewRelease,
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
        path: routes.weekChart,
        component: WeekChart,
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
    {
        path: routes.artistSinger,
        component: Singer,
    },
    {
        path: routes.chill,
        component: Chill,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
