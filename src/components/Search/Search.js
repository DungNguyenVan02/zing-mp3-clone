import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '~/components/icons';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useDebounce } from '../hooks';
import * as actions from '~/redux/actions';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [textSearch, setTextSearch] = useState('');
    const keyWords = useDebounce(textSearch, 1000);
    useEffect(() => {
        dispatch(actions.search(textSearch));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWords]);

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            const path = `${routes.searchAll}`;
            textSearch.length > 0 && navigate(path);
        }
    };
    const handleChangeInput = (e) => {
        let searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setTextSearch(searchValue);
        }
    };

    const handleShowResult = (attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <div className={cx('suggest-song')}>
                <h4 className={cx('search-title')}>Gợi ý kết quả</h4>
                {/* handle show result */}
            </div>
        </div>
    );
    return (
        <HeadlessTippy interactive render={handleShowResult} placement="bottom" offset={[-100, 10]}>
            <div className={cx('wrapper')}>
                <SearchIcon className={cx('icon-search')} />
                <input
                    className={cx('search-input')}
                    value={textSearch}
                    onChange={handleChangeInput}
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    onKeyUp={handleSearch}
                />
                <button className={cx('clear')}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            </div>
        </HeadlessTippy>
    );
}

export default Search;
