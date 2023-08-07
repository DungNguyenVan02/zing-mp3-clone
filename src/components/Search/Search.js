import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
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
    const { search } = useSelector((state) => state.music);
    const [textSearch, setTextSearch] = useState('');
    const [isShow, setIsShow] = useState(false);

    const keyWords = useDebounce(textSearch, 500);

    useEffect(() => {
        dispatch(actions.search(textSearch));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWords]);

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            const path = `${routes.searchAll}`;
            textSearch.length > 0 &&
                navigate({
                    pathname: path,
                    search: createSearchParams({
                        q: keyWords,
                    }).toString(),
                });
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
    const handleHideResults = () => {
        setIsShow(false);
    };
    return (
        <HeadlessTippy
            visible={
                isShow &&
                (search?.data?.artists?.length > 0 ||
                    search?.data?.playlists?.length > 0 ||
                    search?.data?.songs?.length > 0)
            }
            onClickOutside={handleHideResults}
            interactive
            render={handleShowResult}
            placement="bottom"
            offset={[0, 0]}
        >
            <div className={cx('wrapper')}>
                <SearchIcon className={cx('icon-search')} />
                <input
                    className={cx('search-input')}
                    value={textSearch}
                    onChange={handleChangeInput}
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    onKeyUp={handleSearch}
                    onFocus={() => setIsShow(true)}
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
