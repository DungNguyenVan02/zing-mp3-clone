import { memo } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import styles from './ListSong.module.scss';
import { NoteMusicIcon, PlayIcon } from '../icons';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function ListItem({ songData }) {
    const dispatch = useDispatch();
    const handleClickSong = (id) => {
        dispatch(actions.setCurrentSongId(id));
        dispatch(actions.setPlaying(true));
    };
    return (
        <div className={cx('song-item')} onClick={() => handleClickSong(songData?.encodeId)}>
            <div className={cx('info')}>
                <NoteMusicIcon />
                <div className={cx('img')}>
                    <img className={cx('img-link')} src={songData?.thumbnail} alt="thumbnail" />
                    <div className={cx('icon')}>
                        <PlayIcon />
                    </div>
                </div>
                <div>
                    <h4 className={cx('title-song')}>{songData?.title}</h4>
                    <span className={cx('singer')}>{songData?.artistsNames}</span>
                </div>
            </div>
            <div className={cx('album')}>{songData?.album?.title}</div>
            <div className={cx('duration')}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
}

export default memo(ListItem);
