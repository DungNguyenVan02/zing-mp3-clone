import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { PauseIcon, PlayIcon } from '../icons';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function ControlMusicCenter({ audio, duration, errAudio }) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, songs } = useSelector((state) => state.music);

    const [currentTime, setCurrentTime] = useState('00:00');
    const [isRandom, setIsRandom] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

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

    useEffect(() => {
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
        const handleEnded = () => {
            if (isRepeat) {
                audio.play();
            } else {
                handleNextSong();
            }
        };
        audio.addEventListener('timeupdate', handlePercentSong);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handlePercentSong);
        };
    });

    useEffect(() => {});

    const handleTogglePlay = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.setPlaying(false));
        } else {
            audio.play();
            dispatch(actions.setPlaying(true));
        }
    };

    const handleProgress = (e) => {
        const clickOffSetX = e.nativeEvent.offsetX;
        const progressWidthValue = Math.floor(progressBar.current.getBoundingClientRect().width);
        audio.currentTime = Math.floor((clickOffSetX * duration) / progressWidthValue);
        dispatch(actions.setPlaying(true));
        audio.play();
    };

    const handleNextSong = () => {
        if (songs) {
            if (isRandom) {
                handleRandomSong();
            } else {
                let currentSong;
                songs?.find((song, index) => {
                    if (song?.encodeId === currentSongId) {
                        currentSong = index + 1;
                    }
                    return currentSong;
                });
                if (currentSong >= songs.length) {
                    currentSong = 0;
                }
                dispatch(actions.setCurrentSongId(songs[currentSong]?.encodeId));
                dispatch(actions.setPlaying(true));
            }
        }
    };

    const handlePrevSong = () => {
        let currentSong;
        songs?.find((song, index) => {
            if (song?.encodeId === currentSongId) {
                currentSong = index - 1;
            }
            return currentSong;
        });
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
        console.log(currentSong);
        dispatch(actions.setCurrentSongId(songs[currentSong]?.encodeId));
    };

    const handleRandomSong = () => {
        let currentSong;
        let filterRandom;
        let newCurrentSong;
        const arrRandom = [];

        songs.forEach((item, index) => {
            if (item?.isWorldWide === true) {
                arrRandom.push(index);
            }
        });
        songs?.find((song, index) => {
            if (song?.encodeId === currentSongId) {
                currentSong = index;
            }
            return currentSong;
        });

        do {
            filterRandom = Math.floor(Math.random() * arrRandom.length);
        } while (filterRandom === arrRandom.includes(currentSong));

        newCurrentSong = arrRandom[filterRandom];
        dispatch(actions.setCurrentSongId(songs[newCurrentSong]?.encodeId));
    };

    return (
        <div className={cx('control-center')}>
            <div className={cx('player-top')}>
                <span
                    className={cx('icon', {
                        random: isRandom,
                    })}
                    onClick={() => setIsRandom(!isRandom)}
                >
                    <FontAwesomeIcon icon={faShuffle} />
                </span>
                <span
                    className={cx('icon')}
                    style={songs.length > 0 ? {} : { opacity: 0.5, cursor: 'no-drop' }}
                    onClick={handlePrevSong}
                >
                    <FontAwesomeIcon icon={faBackwardStep} />
                </span>
                <span className={`${styles.icon} ${styles.outline}`} onClick={handleTogglePlay}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
                <span
                    className={cx('icon')}
                    style={songs.length > 0 ? {} : { opacity: 0.5, cursor: 'no-drop' }}
                    onClick={handleNextSong}
                >
                    <FontAwesomeIcon icon={faForwardStep} />
                </span>
                <span
                    className={cx('icon', {
                        repeat: isRepeat,
                    })}
                    onClick={() => setIsRepeat(!isRepeat)}
                >
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
