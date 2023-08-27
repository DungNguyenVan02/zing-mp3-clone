import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import { Link, useLocation } from 'react-router-dom';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function Header() {
    const location = useLocation();
    const { user } = useSelector((state) => state.home);

    const MENUS = [
        {
            title: 'Tổng quan',
            to: routes.myMusic,
        },
        {
            title: 'Bài hát',
            to: routes.myMusicSong,
        },
        {
            title: 'Playlist',
            to: routes.myMusicPlaylist,
        },
    ];
    return (
        <div>
            <div className={cx('info')}>
                <div className={cx('img-wrap')}>
                    <figure>
                        <img className={cx('img-link')} src={user?.photoURL} alt="" />
                    </figure>
                </div>
                <h3 className={cx('name')}>{user?.displayName}</h3>
            </div>
            <div className={cx('menu')}>
                <div className={cx('menu-list')}>
                    {MENUS.map((item, index) => (
                        <Link key={index} to={item.to}>
                            <Button
                                textBtn
                                className={cx('menu-item', {
                                    active: item.to === location.pathname,
                                })}
                            >
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
