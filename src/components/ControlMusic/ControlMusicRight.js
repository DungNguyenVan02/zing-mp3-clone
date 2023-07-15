import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { ListIcon, MVIcon, VolumeIcon, WinDowIcon } from '../icons';

const cx = classNames.bind(styles);
function ControlMusicRight() {
    return (
        <div className={cx('control-right')}>
            <span className={cx('icon')}>
                <MVIcon />
            </span>
            <span className={cx('icon')}>
                <WinDowIcon />
            </span>
            <span className={cx('icon')}>
                <VolumeIcon />
            </span>
            <input className={cx('volume-input')} type="range" max={100} min={0} step={1} />
            <span className={cx('icon')}>
                <ListIcon />
            </span>
        </div>
    );
}

export default ControlMusicRight;
