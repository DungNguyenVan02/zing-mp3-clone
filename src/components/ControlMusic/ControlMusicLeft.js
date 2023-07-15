import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { HeartIcon, MenuIcon } from '../icons';

const cx = classNames.bind(styles);
function ControlMusicLeft({ data }) {
    return (
        <div className={cx('control-left')}>
            <div className={cx('img')}>
                <img className={cx('img-link')} src={data?.thumbnail} alt={data?.title} />
            </div>
            <div className={cx('info')}>
                <h3 className={cx('name')}>{data?.title}</h3>
                <p className={cx('singer')}>{data?.artistsNames}</p>
            </div>
            <div className={cx('option-left')}>
                <span className={cx('icon')} title="Thêm vào thư viện">
                    <HeartIcon />
                </span>
                <span className={cx('icon')} title="Xem thêm">
                    <MenuIcon />
                </span>
            </div>
        </div>
    );
}

ControlMusicLeft.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ControlMusicLeft;
