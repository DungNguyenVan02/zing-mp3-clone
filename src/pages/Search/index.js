import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import routes from '~/config/routes';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const navigate = useNavigate();
    const { keywords } = useParams();

    const MENU = [
        {
            title: 'Tất cả',
            path: `${routes.searchAll.split(':')[0] + keywords}`,
        },
        {
            title: 'Bài Hát',
            path: `${routes.searchSongs.split(':')[0] + keywords}`,
        },
        {
            title: 'PlayList/Album',
            path: `${routes.searchPlaylist.split(':')[0] + keywords}`,
        },
    ];
    const handleClick = (item) => {
        navigate(item.path);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('title')}>Kết Quả Tìm Kiếm</h2>
                <ul className={cx('list-menu')}>
                    {MENU.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => (isActive ? cx('active') : '')}
                            >
                                <li className={cx('list-item')} onClick={() => handleClick(item)}>
                                    {item.title}
                                </li>
                            </NavLink>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Search;
