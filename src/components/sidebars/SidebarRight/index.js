import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function SidebarRight() {
    const { isOpenSidebar } = useSelector((state) => state.home);
    return (
        <h3
            className={cx('wrapper', {
                active: isOpenSidebar,
            })}
        >
            sidebar right
        </h3>
    );
}

export default SidebarRight;
