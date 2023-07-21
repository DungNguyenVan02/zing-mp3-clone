import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { playingSongSelector, albumSelector } from '~/redux/selector';
import { PauseIcon, PlayIcon } from '../icons';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function ControlMusicCenter({ audio, duration, errAudio }) {
    const dispatch = useDispatch();
    const isPlaying = useSelector(playingSongSelector);
    const isAlbum = useSelector(albumSelector);
    const [currentTime, setCurrentTime] = useState('00:00');

    const progressBar = useRef();
    const progressArea = useRef();

    useEffect(() => {
        if (isPlaying) {
            progressArea.current.width = 0;
            audio.load();
            audio.play();
        } else {
            audio.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, errAudio]);

    const handleTogglePlay = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.setPlaying(false));
        } else {
            audio.play();
            dispatch(actions.setPlaying(true));
        }
    };

    const handlePercentSong = () => {
        const currentTime = audio.currentTime;
        const progressTime = (currentTime / duration) * 100;
        progressArea.current.style.width = progressTime + '%';

        const minutes = Math.floor(currentTime >= 60 ? currentTime / 60 : '0');
        const timeRemaining = currentTime - minutes * 60;
        const second = Math.floor(timeRemaining < 60 ? timeRemaining : 0);
        const timeRender = `${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;

        setCurrentTime(timeRender);
    };
    audio.addEventListener('timeupdate', handlePercentSong);

    const handleProgress = (e) => {
        const clickOffSetX = e.nativeEvent.offsetX;
        const progressWidthValue = Math.floor(progressBar.current.getBoundingClientRect().width);
        audio.currentTime = Math.floor((clickOffSetX * duration) / progressWidthValue);
        dispatch(actions.setPlaying(true));
        audio.play();
    };

    const handleNextSong = () => {
        if (isAlbum) {
            console.log(123);
        }
    };

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
                <span
                    className={cx('icon')}
                    style={isAlbum ? {} : { opacity: 0.5, cursor: 'no-drop' }}
                    onClick={handleNextSong}
                >
                    <FontAwesomeIcon icon={faForwardStep} />
                </span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faRepeat} />
                </span>
            </div>
            <div className={cx('player-bottom')}>
                <span className={cx('current-time')}>{currentTime}</span>
                <div ref={progressBar} onClick={handleProgress} className={cx('progress')}>
                    <div ref={progressArea} className={cx('progress-area')}></div>
                </div>
                <span className={cx('total-time')}>
                    {duration ? moment.utc(duration * 1000).format('mm:ss') : '00:00'}
                </span>
            </div>
        </div>
    );
}

export default ControlMusicCenter;
