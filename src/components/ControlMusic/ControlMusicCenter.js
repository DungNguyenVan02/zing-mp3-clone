import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { PauseIcon, PlayIcon } from '../icons';
import { Spinner as SpinnerLoading } from '../Animation';

import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function ControlMusicCenter({ audio, duration, errAudio }) {
    const dispatch = useDispatch();
    const { currentSongId, currentAlbumId, isPlaying, isPlayingRandom, isLoading, songs, songsBasics, volume } =
        useSelector((state) => state.music);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [isRandom, setIsRandom] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const progressBar = useRef();
    const progressArea = useRef();
    const audioRef = useRef();

    useEffect(() => {
        audioRef.current.pause();
        if (isPlaying && audioRef.current) {
            progressArea.current.width = 0;
            audioRef.current.load();
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio, errAudio]);

    useEffect(() => {
        if (isPlayingRandom) {
            handleRandomSong();
            dispatch(actions.setPlaying(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songsBasics]);

    useEffect(() => {
        audioRef.current.volume = volume / 100;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volume, audio]);

    useEffect(() => {
        const handlePercentSong = () => {
            const currentTime = audioRef.current.currentTime;
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
                audioRef.current.play();
            } else {
                handleNextSong();
            }
        };
        audioRef.current?.addEventListener('timeupdate', handlePercentSong);
        audioRef.current?.addEventListener('ended', handleEnded);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleRandomSong = () => {
        let currentSong;
        let filterRandom;
        let newCurrentSong;
        songsBasics?.find((song, index) => {
            if (song?.encodeId === currentSongId) {
                currentSong = index;
            }
            return currentSong;
        });

        do {
            filterRandom = Math.floor(Math.random() * songsBasics.length);
        } while (filterRandom === songsBasics.includes(currentSong));
        newCurrentSong = songsBasics[filterRandom];
        dispatch(actions.setCurrentSongId(newCurrentSong?.encodeId));
    };

    const handleTogglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            dispatch(actions.setPlaying(false));
        } else {
            audioRef.current.play();
            dispatch(actions.setPlaying(true));
        }
    };

    const handleProgress = (e) => {
        const clickOffSetX = e.nativeEvent.offsetX;
        const progressWidthValue = Math.floor(progressBar.current.getBoundingClientRect().width);
        audioRef.current.currentTime = Math.floor((clickOffSetX * duration) / progressWidthValue);
        dispatch(actions.setPlaying(true));
        audioRef.current.play();
    };

    const handleNextSong = () => {
        if (isRandom) {
            handleRandomSong();
        } else {
            let currentSong;
            songsBasics?.find((song, index) => {
                if (song?.encodeId === currentSongId) {
                    currentSong = index + 1;
                }
                return currentSong;
            });
            if (currentSong >= songsBasics.length) {
                currentSong = 0;
            }
            dispatch(actions.setCurrentSongId(songsBasics[currentSong]?.encodeId));
            dispatch(actions.setPlaying(true));
        }
    };

    const handlePrevSong = () => {
        if (isRandom) {
            handleRandomSong();
        } else {
            let currentSong;
            songsBasics?.find((song, index) => {
                if (song?.encodeId === currentSongId) {
                    currentSong = index - 1;
                }
                return currentSong;
            });
            if (currentSong < 0) {
                currentSong = songsBasics.length - 1;
            }
            dispatch(actions.setCurrentSongId(songsBasics[currentSong]?.encodeId));
        }
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
                    {isLoading ? <SpinnerLoading /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
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
                <audio src={audio} ref={audioRef} />
            </div>
        </div>
    );
}

export default ControlMusicCenter;
