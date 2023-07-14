import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';

const cx = classNames.bind(styles);

function SidebarRight() {
    return <h3 className={cx('wrapper')}>sidebar right</h3>;
}

export default SidebarRight;
