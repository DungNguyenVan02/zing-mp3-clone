import { memo } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ListSong.module.scss';
import { NoteMusicIcon, PlayIcon, VipIcon } from '../icons';
import * as actions from '~/redux/actions';
import Playing from '../Animation/Playing';

const cx = classNames.bind(styles);

function ListItem({ songData }) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying } = useSelector((state) => state.music);
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
                <NoteMusicIcon />
                <div className={cx('img')}>
                    <img className={cx('img-link')} src={songData?.thumbnail} alt="thumbnail" />
                    <div className={cx('icon')}>{isPlaying ? <Playing /> : <PlayIcon />}</div>
                </div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <h4 className={cx('title-song')}>{songData?.title}</h4>
                        {songData?.isWorldWide === false && <VipIcon />}
                    </div>
                    <span className={cx('singer')}>{songData?.artistsNames}</span>
                </div>
            </div>
            <div className={cx('album')}>{songData?.album?.title}</div>
            <div className={cx('duration')}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
}

export default memo(ListItem);
