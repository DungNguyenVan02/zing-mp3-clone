import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchIcon } from '~/components/icons';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useDebounce } from '../hooks';
import routes from '~/config/routes';
import Media from '../Media';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state.music);

    const [textSearch, setTextSearch] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef();
    const keyWords = useDebounce(textSearch, 500);

    useEffect(() => {
        if (keyWords !== '') {
            setIsLoading(true);
            dispatch(actions.search(keyWords));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWords]);

    useEffect(() => {
        setIsLoading(false);
    }, [search]);

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            setIsShow(false);
            const path = `${routes.searchAll.split(':')[0] + textSearch}`;
            textSearch !== '' && navigate(path);
        }
    };

    const handleClear = () => {
        setTextSearch('');
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
                <div className={cx('search-content')}>
                    {search?.data?.songs?.map((item) => (
                        <Media key={item?.encodeId} songData={item} width="40px" height="40px" small showInfo />
                    ))}
                </div>
            </div>
        </div>
    );
    const handleHideResults = () => {
        setIsShow(false);
    };
    return (
        <HeadlessTippy
            visible={isShow && search?.data?.songs?.length > 0}
            onClickOutside={handleHideResults}
            interactive
            render={handleShowResult}
            placement="bottom"
            offset={[0, 0]}
        >
            <div className={cx('wrapper')}>
                <SearchIcon className={cx('icon-search')} />
                <input
                    ref={inputRef}
                    className={cx('search-input')}
                    value={textSearch}
                    onChange={handleChangeInput}
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                    onKeyUp={handleSearch}
                    onFocus={() => setIsShow(true)}
                />
                {textSearch.length > 0 && !isLoading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}
                {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
