import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
const cx = classNames.bind(styles);

function SearchResult() {
    return <div className={cx('wrapper')}></div>;
}

export default SearchResult;
