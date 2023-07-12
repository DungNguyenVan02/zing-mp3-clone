import Home from '~/pages/Home';
import MyMusic from '~/pages/MyMusic';
import NewMusic from '~/pages/NewMusic';
import Radio from '~/pages/Radio';
import Top100 from '~/pages/Top100';

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
};
export default config;
