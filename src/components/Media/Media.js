import moment from 'moment';
import 'moment/locale/vi';
import { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { PlayIcon, HeartIcon, MenuIcon, VipIcon, CopyIcon, ShareIcon } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/redux/actions';
import { Playing, Spinner as SpinnerLoading } from '../Animation';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { doc, setDoc, updateDoc, arrayUnion, query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Media({
    songData,
    order,
    percent,
    className,
    small,
    bgNone,
    width = '60px',
    height = '60px',
    showInfo,
    playList,
    props,
}) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, isLoading } = useSelector((state) => state.music);
    const { user } = useSelector((state) => state.home);

    const [songs, setSongs] = useState([]);

    const handlePlaying = () => {
        dispatch(actions.setPlaying(true));
        dispatch(actions.setCurrentSongId(songData?.encodeId));
    };
    const OPTION_MORE_1 = [
        {
            title: 'Sao chép link',
            icon: <CopyIcon />,
        },

        {
            title: 'Chia sẻ',
            icon: <ShareIcon />,
        },
    ];
    const OPTION_MORE_2 = [
        ...OPTION_MORE_1,
        {
            title: 'Xóa khỏi Playlist',
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            handleClick: (index) => dispatch(actions.deleteRecentSongs(index)),
        },
    ];
    const handleShowOption = (attrs) => (
        <ul className={cx('option-more')} tabIndex="-1" {...attrs}>
            {(playList ? OPTION_MORE_2 : OPTION_MORE_1)?.map((item, index) => {
                return (
                    <li
                        key={index}
                        className={cx('option-item')}
                        onClick={item.handleClick ? () => item.handleClick(index) : () => {}}
                    >
                        <span className={cx('option-more-icon')}>{item.icon}</span>
                        <h3 className={cx('option-more-title')}>{item.title}</h3>
                    </li>
                );
            })}
        </ul>
    );

    useEffect(() => {
        if (!user?.uid) return;
        const q = query(collection(db, 'songs'), where('uid', '==', user?.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const songs = [];
            querySnapshot.forEach((doc) => {
                songs.push(doc.data());
            });
            setSongs(songs);
        });
        return unsubscribe;
    }, [user?.uid]);

    const handleAddMyFavorite = async () => {
        if (user === null) {
            toast.warning('Vui lòng đăng nhập vào ứng dụng!');
            return;
        }

        if (songData?.isWorldWide === false) {
            toast.warning('Bài hát chỉ dành cho tài khoản VIP!');
            return;
        }

        const docRef = doc(db, 'songs', 'songId');
        if (songs.length <= 0) {
            await setDoc(docRef, {
                uid: user?.uid,
                myFavorites: { songData },
            });
        } else {
            await updateDoc(docRef, {
                myFavorites: arrayUnion(songData),
            });
        }

        toast.info('Đã thêm vào yêu thích');
    };

    const classes = cx('wrapper', {
        [className]: className,
        activeSzBar: small && songData?.encodeId === currentSongId && !bgNone && !showInfo,
        active: songData?.encodeId === currentSongId,
    });

    return (
        <div className={classes} {...props}>
            {order && <h2 className={cx('rank', `rank-${order}`)}>{order}</h2>}
            <figure className={cx('img')} onClick={handlePlaying} style={{ width: width, height: height }}>
                <img className={cx('img-link')} src={songData?.thumbnail} alt={songData?.title} />
                <div
                    className={cx('play-icon', {
                        showIcon: songData?.encodeId === currentSongId,
                    })}
                >
                    {isLoading && songData?.encodeId === currentSongId ? (
                        <SpinnerLoading />
                    ) : isPlaying && !isLoading && songData?.encodeId === currentSongId ? (
                        <Playing height={24} />
                    ) : (
                        <PlayIcon />
                    )}
                </div>
            </figure>
            <div className={cx('body')}>
                <div style={{ display: 'flex' }}>
                    <h3 className={cx('name')}>{songData?.title}</h3>
                    {songData?.isWorldWide === false && <VipIcon />}
                </div>
                <p className={cx('singer')}>{songData?.artistsNames}</p>
                {!small && !showInfo ? (
                    <p className={cx('day')}>{moment(songData?.releaseDate * 1000).fromNow()}</p>
                ) : (
                    <></>
                )}
            </div>
            {percent && <h2 className={cx('percent')}>{percent}</h2>}
            <div
                className={cx('option', {
                    'd-none': percent,
                })}
            >
                <div className={cx('option-list')}>
                    {showInfo && !small ? (
                        <span className={cx('duration')}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</span>
                    ) : (
                        <></>
                    )}
                    <span className={cx('option-icon')} title="Thêm vào yêu thích" onClick={handleAddMyFavorite}>
                        <HeartIcon height="1.6rem" width="1.6rem" onClick={handleAddMyFavorite} />
                    </span>
                    <HeadlessTippy trigger="click" interactive render={handleShowOption} placement="top">
                        <span className={cx('option-icon')} title="xem thêm">
                            <MenuIcon height="1.6rem" width="1.6rem" />
                        </span>
                    </HeadlessTippy>
                </div>
            </div>
        </div>
    );
}

export default memo(Media);
