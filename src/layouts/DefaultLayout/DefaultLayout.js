import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import PropTypes from 'prop-types';
import SidebarLeft from '~/components/sidebars/SidebarLeft';
import SidebarRight from '~/components/sidebars/SidebarRight';
import Header from '~/components/Header';
import ControlMusic from '~/components/ControlMusic/';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <SidebarLeft />
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('container')}>{children}</div>
                <SidebarRight />
            </div>
            <div className={cx('control')}>
                <ControlMusic />
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
