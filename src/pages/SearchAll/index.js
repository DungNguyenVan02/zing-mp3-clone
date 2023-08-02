import Search from '../Search';
import classNames from 'classnames/bind';
import styles from './SearchAll.module.scss';

const cx = classNames.bind(styles);
function SearchAll() {
    return (
        <div className={cx('wrapper')}>
            <Search />
            search all
        </div>
    );
}

export default SearchAll;
