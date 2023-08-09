import moment, { duration } from 'moment';
import 'moment/locale/vi';
import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { PlayIcon, HeartIcon, MenuIcon, VipIcon, CopyIcon, ShareIcon } from '../icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/redux/actions';
import { Playing, Spinner as SpinnerLoading } from '../Animation';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

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
    props,
}) {
    const dispatch = useDispatch();
    const { currentSongId, isPlaying, isLoading } = useSelector((state) => state.music);

    const handlePlaying = () => {
        dispatch(actions.setPlaying(true));
        dispatch(actions.setCurrentSongId(songData?.encodeId));
    };
    const OPTION_MORE = [
        {
            title: 'Sao chép link',
            icon: <CopyIcon />,
        },
        {
            title: 'Xóa khỏi Playlist',
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            handleClick: (index) => dispatch(actions.deleteRecentSongs(index)),
        },
        {
            title: 'Chia sẻ',
            icon: <ShareIcon />,
        },
    ];
    const handleShowOption = (attrs) => (
        <ul className={cx('option-more')} tabIndex="-1" {...attrs}>
            {OPTION_MORE.map((item, index) => (
                <li
                    key={index}
                    className={cx('option-item')}
                    onClick={item.handleClick ? () => item.handleClick(index) : () => {}}
                >
                    <span className={cx('option-more-icon')}>{item.icon}</span>
                    <h3 className={cx('option-more-title')}>{item.title}</h3>
                </li>
            ))}
        </ul>
    );

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
                    <span className={cx('option-icon')} title="Thêm vào yêu thích">
                        <HeartIcon height="1.6rem" width="1.6rem" />
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
