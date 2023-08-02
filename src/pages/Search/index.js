import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Search() {
    const MENU = [
        {
            title: 'Tất cả',
            path: routes.searchAll,
        },
        {
            title: 'Bài Hát',
            path: routes.searchSongs,
        },
    ];
    const { search } = useSelector((state) => state.music);
    console.log(search);
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('title')}>Kết Quả Tìm Kiếm</h2>
                <ul className={cx('list-menu')}>
                    {MENU.map((item, index) => (
                        <li key={index} className={cx('list-item')} onClick={() => navigate(item.path)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
