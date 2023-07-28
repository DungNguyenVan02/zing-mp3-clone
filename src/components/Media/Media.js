import moment from 'moment';
import 'moment/locale/vi';
import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { PlayIcon, HeartIcon, MenuIcon, VipIcon } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/redux/actions';
import { Playing, Spinner as SpinnerLoading } from '../Animation';

const cx = classNames.bind(styles);

function Media({ songData }) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, isLoading } = useSelector((state) => state.music);

    const handlePlaying = () => {
        dispatch(actions.setPlaying(true));
        dispatch(actions.setCurrentSongId(songData?.encodeId));
    };

    return (
        <div
            className={cx('wrapper', {
                active: songData?.encodeId === currentSongId,
            })}
        >
            <div className={cx('img')} onClick={handlePlaying}>
                <img className={cx('img-link')} src={songData?.thumbnail} alt={songData?.title} />
                <div
                    className={cx('play-icon', {
                        showIcon: songData?.encodeId === currentSongId,
                    })}
                >
                    {isLoading && songData.encodeId === currentSongId ? (
                        <SpinnerLoading />
                    ) : isPlaying && !isLoading && songData.encodeId === currentSongId ? (
                        <Playing height={24} />
                    ) : (
                        <PlayIcon />
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <div style={{ display: 'flex' }}>
                    <h3 className={cx('name')}>{songData?.title}</h3>
                    {songData?.isWorldWide === false && <VipIcon />}
                </div>
                <p className={cx('singer')}>{songData?.artistsNames}</p>
                <p className={cx('day')}>{moment(songData?.releaseDate * 1000).fromNow()}</p>
            </div>
            <div className={cx('option')}>
                <span className={cx('duration')}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</span>
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

export default memo(Media);
