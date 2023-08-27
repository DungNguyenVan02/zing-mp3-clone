import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';
import { BoxMusicIcon, CircleIcon, NoteMusicIcon, StarIcon, ChartIcon } from '~/components/icons';
import images from '~/assets/images';
import routes from '~/config/routes';
import SidebarLeftItem from './SidebarLeftItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarLeft() {
    const MENU_ITEMS = [
        {
            icon: <BoxMusicIcon />,
            title: 'Cá nhân',
            to: routes.myMusic,
        },
        {
            icon: <CircleIcon />,
            title: 'Khám phá',
            to: routes.home,
        },
        {
            icon: <ChartIcon />,
            title: '#zingchart',
            to: routes.zingChart,
        },
        {
            icon: <NoteMusicIcon />,
            title: 'BXH Nhạc Mới',
            to: routes.newRelease,
        },
        {
            icon: <StarIcon />,
            title: 'Top 100',
            to: routes.top100,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Link to={routes.home}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx('logo-sub')}>
                    <img src={images.logoMini} alt="logo" />
                </div>
            </Link>
            <div className={cx('menu-list')}>
                {MENU_ITEMS.map((item, index) => {
                    return <SidebarLeftItem key={index} title={item.title} to={item.to} icon={item.icon} />;
                })}
            </div>
        </div>
    );
}

export default SidebarLeft;
