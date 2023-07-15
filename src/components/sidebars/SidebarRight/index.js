import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';
import { useSelector } from 'react-redux';
import { openSidebarSelector } from '~/redux/selector';

const cx = classNames.bind(styles);

function SidebarRight() {
    const isOpen = useSelector(openSidebarSelector);
    console.log(isOpen);
    return (
        <h3
            className={cx('wrapper', {
                active: isOpen,
            })}
        >
            sidebar right
        </h3>
    );
}

export default SidebarRight;
