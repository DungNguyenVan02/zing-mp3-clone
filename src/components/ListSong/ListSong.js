import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ListSong.module.scss';
import ListItem from './ListItem';
import moment from 'moment';
const cx = classNames.bind(styles);

function ListSong({ songs }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span style={{ flex: 4 }}>Bài hát</span>
                <span style={{ flex: 2 }}>Album</span>
                <span style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>Thời gian</span>
            </div>
            <div className={cx('song-list')}>
                {songs?.items.map((song) => (
                    <ListItem key={song?.encodeId} songData={song} />
                ))}
                <div className={cx('song-list-info')}>
                    <span className={cx('total')}>{`${songs?.total} bài hát`}</span>
                    {' - '}
                    <span className={cx('total')}>{`${moment.utc(songs?.totalDuration * 1000).format('HH')} giờ ${moment
                        .utc(songs?.totalDuration * 1000)
                        .format('mm')} phút`}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(ListSong);
