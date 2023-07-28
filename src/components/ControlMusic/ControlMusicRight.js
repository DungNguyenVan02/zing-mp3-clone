import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { ListIcon, MVIcon, VolumeIcon, MuteIcon, WinDowIcon } from '../icons';
import { useDispatch } from 'react-redux';
import { setOpenSidebar, setVolumeSong } from '~/redux/actions';

const cx = classNames.bind(styles);
function ControlMusicRight() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const [volume, setVolume] = useState(0);

    const handleOpen = () => {
        setIsOpen(!isOpen);
        dispatch(setOpenSidebar(isOpen));
    };
    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
    };
    useEffect(() => {
        dispatch(setVolumeSong(volume));
    }, [volume]);

    return (
        <div className={cx('control-right')}>
            <span className={cx('icon')}>
                <MVIcon />
            </span>
            <span className={cx('icon')}>
                <WinDowIcon />
            </span>
            <span className={cx('icon')}>
                {volume > 0 ? (
                    <span onClick={() => setVolume(0)}>
                        <VolumeIcon />
                    </span>
                ) : (
                    <span onClick={() => setVolume(70)}>
                        <MuteIcon />
                    </span>
                )}
            </span>
            <input
                className={cx('volume-input')}
                onChange={handleChangeVolume}
                type="range"
                max={100}
                min={0}
                step={1}
                value={volume}
            />
            <span className={cx('icon')} onClick={handleOpen}>
                <ListIcon />
            </span>
        </div>
    );
}

export default ControlMusicRight;
