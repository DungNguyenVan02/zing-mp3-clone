import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ListSong.module.scss';
import ListItem from './ListItem';
import moment from 'moment';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function ListSong({ total, totalDuration, isHide }) {
    const { songs } = useSelector((state) => state.music);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span style={{ flex: 4 }}>Bài hát</span>
                {!isHide && <span style={{ flex: 2 }}>Album</span>}
                {!isHide && <span style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>Thời gian</span>}
            </div>
            <div className={cx('song-list')}>
                {songs?.map((song) => (
                    <ListItem key={song?.encodeId} songData={song} />
                ))}
                {totalDuration && total && (
                    <div className={cx('song-list-info')}>
                        <span className={cx('total')}>{`${total} bài hát`}</span>
                        {' - '}
                        <span className={cx('total')}>{`${moment.utc(totalDuration * 1000).format('HH')} giờ ${moment
                            .utc(totalDuration * 1000)
                            .format('mm')} phút`}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(ListSong);
