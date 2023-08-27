import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ListSong.module.scss';
import { HeartIcon, NoteMusicIcon, PlayIcon, VipIcon } from '../icons';
import * as actions from '~/redux/actions';
import { Playing, Spinner as SpinnerLoading } from '../Animation';
import { arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ListItem({ songData, order, small }) {
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);
    const { currentSongId, isPlaying, isLoading } = useSelector((state) => state.music);
    const { user } = useSelector((state) => state.home);
    const handleClickSong = (id) => {
        dispatch(actions.setCurrentSongId(id));
        dispatch(actions.setPlaying(true));
    };

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
    return (
        <div
            className={cx('song-item', {
                active: songData.encodeId === currentSongId,
            })}
            onClick={() => handleClickSong(songData?.encodeId)}
        >
            <div className={cx('info')}>
                {order ? (
                    <>
                        <h3 className={cx('number', `rank-${order}`)}>{order}</h3>
                        <div className={cx('sub-number')}>
                            {songData?.rakingStatus > 0 ? (
                                <div className={cx('up-rank')}>{songData?.rakingStatus}</div>
                            ) : songData?.rakingStatus === 0 ? (
                                <span>-</span>
                            ) : (
                                <div className={cx('down-rank')}>{songData?.rakingStatus * -1}</div>
                            )}
                        </div>
                    </>
                ) : (
                    <NoteMusicIcon />
                )}

                <div className={cx('img')}>
                    <img className={cx('img-link')} src={songData?.thumbnail} alt="thumbnail" />
                    <div
                        className={cx('icon', {
                            iconShow: songData.encodeId === currentSongId && !isLoading,
                        })}
                    >
                        {isLoading && songData.encodeId === currentSongId ? (
                            <SpinnerLoading />
                        ) : isPlaying && songData.encodeId === currentSongId && !isLoading ? (
                            <Playing height={24} />
                        ) : (
                            <PlayIcon />
                        )}
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <h4 className={cx('title-song')}>{songData?.title}</h4>
                        {songData?.isWorldWide === false && <VipIcon />}
                    </div>
                    <span className={cx('singer')}>{songData?.artistsNames}</span>
                </div>
            </div>
            {!small && <div className={cx('album')}>{songData?.album?.title}</div>}
            <div
                className={cx('duration', {
                    order: small,
                })}
            >
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
            <div className={cx('heart')} onClick={handleAddMyFavorite}>
                <HeartIcon height="1.6rem" width="1.6rem" />
            </div>
        </div>
    );
}

export default memo(ListItem);
