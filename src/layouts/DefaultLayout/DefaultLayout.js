import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
import SidebarLeft from '~/components/sidebars/SidebarLeft';
import SidebarRight from '~/components/sidebars/SidebarRight';
import Header from '~/components/Header';
import ControlMusic from '~/components/ControlMusic/';
import { Loading } from '~/components/Animation';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { singer } = useParams();
    const { isLoadingPage } = useSelector((state) => state.home);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <SidebarLeft />
            </div>
            <div className={cx('content')}>
                {isLoadingPage && (
                    <div className={cx('loading-page')}>
                        <Loading />
                    </div>
                )}
                <div
                    className={cx('header', {
                        bgn: singer,
                    })}
                >
                    <Header />
                </div>
                <div
                    className={cx('container', {
                        mgn: singer,
                    })}
                >
                    {children}
                </div>
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
