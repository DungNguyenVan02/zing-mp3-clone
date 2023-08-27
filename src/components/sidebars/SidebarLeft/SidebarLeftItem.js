import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import routes from '~/config/routes';
import { toast } from 'react-toastify';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function SidebarLeftItem({ title, icon, to }) {
    const { user } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const handleClick = () => {
        if (user === null) {
            if (to === routes.myMusic) {
                toast.info('Vui lòng đăng nhậ ứng dụng!');
                dispatch(actions.setOpenPopup(true));
            }
        }
    };
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to} onClick={handleClick}>
            <div className={cx('menu-item-wrap')}>
                <span>{icon}</span>
                <h3>{title}</h3>
            </div>
        </NavLink>
    );
}

SidebarLeftItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

export default SidebarLeftItem;
