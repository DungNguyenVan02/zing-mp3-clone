import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ControlMusicCenter() {
    return (
        <div className={cx('control-center')}>
            <div className={cx('player-top')}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faShuffle} />
                </span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faBackwardStep} />
                </span>
                <span className={`${styles.icon} ${styles.outline}`}>
                    <FontAwesomeIcon icon={faPlay} />
                    {/* <FontAwesomeIcon icon={faPause} /> */}
                </span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faForwardStep} />
                </span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faRepeat} />
                </span>
            </div>
            <div className={cx('player-bottom')}>
                <span className={cx('time')}>00:00</span>
                <div className={cx('progress')}>
                    <div className={cx('progress-area')}></div>
                </div>
                <span className={cx('time')}>3:00</span>
            </div>
        </div>
    );
}

export default ControlMusicCenter;
