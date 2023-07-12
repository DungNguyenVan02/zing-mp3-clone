import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '~/components/icons';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import SearchResult from './SearchResult/SearchResult';

const cx = classNames.bind(styles);

const handleShowResult = (attrs) => (
    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
        <h4 className={cx('search-title')}>Gợi ý kết quả</h4>
        <SearchResult />
    </div>
);

function Search() {
    return (
        <HeadlessTippy interactive render={handleShowResult} placement="bottom" offset={[0, 0]}>
            <div className={cx('wrapper')}>
                <SearchIcon className={cx('icon-search')} />
                <input className={cx('search-input')} placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." />
                <button className={cx('clear')}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            </div>
        </HeadlessTippy>
    );
}

export default Search;
