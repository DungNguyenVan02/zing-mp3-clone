import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarLeft.module.scss';

const cx = classNames.bind(styles);

function SidebarLeftItem({ title, icon, to }) {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
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
