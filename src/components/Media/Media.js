import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { PlayIcon, HeartIcon, MenuIcon } from '../icons';
const cx = classNames.bind(styles);

function Media({ src, name, singer, time = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img')}>
                <img className={cx('img-link')} src={src} alt={name} />
                <PlayIcon className={cx('play-icon')} />
            </div>
            <div className={cx('body')}>
                <h3 className={cx('name')}>{name}</h3>
                <p className={cx('singer')}>{singer}</p>
                {time && <p className={cx('day')}>{time}</p>}
            </div>
            <div className={cx('option')}>
                <span className={cx('duration')}>3:32</span>
                <div className={cx('option-list')}>
                    <span className={cx('option-icon')}>
                        <HeartIcon height="1.6rem" width="1.6rem" />
                    </span>
                    <span className={cx('option-icon')}>
                        <MenuIcon height="1.6rem" width="1.6rem" />
                    </span>
                </div>
            </div>
        </div>
    );
}

Media.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    singer: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
};

export default Media;
