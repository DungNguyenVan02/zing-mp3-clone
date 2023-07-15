import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import { HeartIcon, MenuIcon } from '../icons';

const cx = classNames.bind(styles);
function ControlMusicLeft() {
    return (
        <div className={cx('control-left')}>
            <div className={cx('img')}>
                <img
                    className={cx('img-link')}
                    src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/3/b/b/93bb0d07f098664abc73579a982294d7.jpg"
                    alt=""
                />
            </div>
            <div className={cx('info')}>
                <h3 className={cx('name')}>Rồi sẽ đến nơi (duet version)</h3>
                <p className={cx('singer')}>JUUN D, O.lew</p>
            </div>
            <div className={cx('option-left')}>
                <span className={cx('icon')} title="Thêm vào thư viện">
                    <HeartIcon />
                </span>
                <span className={cx('icon')} title="Xem thêm">
                    <MenuIcon />
                </span>
            </div>
        </div>
    );
}

export default ControlMusicLeft;
