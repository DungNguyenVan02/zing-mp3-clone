import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import PropTypes from 'prop-types';
import SidebarLeft from '~/components/sidebars/SidebarLeft';
// import SidebarRight from '~/components/sidebars/SidebarRight';
import Header from '~/components/Header';
import ControlMusic from '~/components/ControlMusic/';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className="grid row no-gutters">
                    <div className={cx('sidebar', 'col l-2 m-2 c-2')}>
                        <SidebarLeft />
                    </div>
                    <div className={cx('content', 'col l-10 m-10')}>
                        <Header />
                        <div className={cx('container')}>{children}</div>
                    </div>
                    {/* <div className={cx('sidebar', 'col l-2 m-0 c-0')}>
                        <SidebarRight />
                    </div> */}
                </div>
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
