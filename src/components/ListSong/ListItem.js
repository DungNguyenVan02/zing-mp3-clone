import { memo } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ListSong.module.scss';
import { NoteMusicIcon, PlayIcon, VipIcon } from '../icons';
import * as actions from '~/redux/actions';
import { Playing, Spinner as SpinnerLoading } from '../Animation';

const cx = classNames.bind(styles);

function ListItem({ songData, order, small }) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, isLoading } = useSelector((state) => state.music);
    const handleClickSong = (id) => {
        dispatch(actions.setCurrentSongId(id));
        dispatch(actions.setPlaying(true));
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
        </div>
    );
}

export default memo(ListItem);
