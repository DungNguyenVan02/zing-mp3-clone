import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';
import { BoxMusicIcon, CircleIcon, RadioIcon, NoteMusicIcon, StarIcon } from '~/components/icons';
import images from '~/assets/images';
import config from '~/config/routes';
import SidebarLeftItem from './SidebarLeftItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <BoxMusicIcon />,
        title: 'Cá nhân',
        to: config.myMusic.path,
    },
    {
        icon: <CircleIcon />,
        title: 'Khám phá',
        to: config.home.path,
    },
    {
        icon: <NoteMusicIcon />,
        title: 'Nhạc mới',
        to: config.newMusic.path,
    },
    {
        icon: <RadioIcon />,
        title: 'Radio',
        to: config.radio.path,
    },
    {
        icon: <StarIcon />,
        title: 'Top 100',
        to: config.top100.path,
    },
];

function SidebarLeft() {
    return (
        <div className={cx('wrapper')}>
            <Link to={config.home.path}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
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
