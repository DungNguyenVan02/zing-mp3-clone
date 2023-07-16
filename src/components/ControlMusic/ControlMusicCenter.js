import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { playingSongSelector } from '~/redux/selector';
import { PauseIcon, PlayIcon } from '../icons';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);
function ControlMusicCenter({ data }) {
    const dispatch = useDispatch();
    const isPlaying = useSelector(playingSongSelector);
    console.log(isPlaying);
    const audioRef = useRef();

    const handleTogglePlay = () => {
        dispatch(actions.setPlaying(!isPlaying));
    };

    // const handlePlay = () => {};

    return (
        <div className={cx('control-center')}>
            <div className={cx('player-top')}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faShuffle} />
                </span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faBackwardStep} />
                </span>
                <span className={`${styles.icon} ${styles.outline}`} onClick={handleTogglePlay}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
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
            <audio ref={audioRef} src={data}></audio>
        </div>
    );
}

export default ControlMusicCenter;
