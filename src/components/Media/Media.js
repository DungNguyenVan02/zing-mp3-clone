import classNames from 'classnames/bind';
import styles from './Media.module.scss';
import { PlayIcon, HeartIcon, MenuIcon } from '../icons';
const cx = classNames.bind(styles);

function Media({ songData }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img')}>
                <img className={cx('img-link')} src={songData?.thumbnail} alt={songData?.title} />
                <PlayIcon className={cx('play-icon')} />
            </div>
            <div className={cx('body')}>
                <h3 className={cx('name')}>{songData?.title}</h3>
                <p className={cx('singer')}>{songData?.thumbnail}</p>
                <p className={cx('day')}>{songData?.artistsNames}</p>
            </div>
            <div className={cx('option')}>
                <span className={cx('duration')}>{`${Math.floor(songData?.duration / 60)}:${
                    songData?.duration % 60 < 10 ? '0' + (songData?.duration % 60) : songData?.duration % 60
                }`}</span>
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

export default Media;
