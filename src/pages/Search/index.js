import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import routes from '~/config/routes';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const MENU = [
        {
            title: 'Tất cả',
            path: routes.searchAll,
        },
        {
            title: 'Bài Hát',
            path: routes.searchSongs,
        },
        {
            title: 'PlayList/Album',
            path: '',
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
                    {MENU.map((item, index) => (
                        <li
                            key={index}
                            className={cx('list-item', {
                                active: item.path === location.pathname,
                            })}
                            onClick={() => handleClick(item)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
