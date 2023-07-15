import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import ControlMusicLeft from './ControlMusicLeft';
import ControlMusicCenter from './ControlMusicCenter';
import ControlMusicRight from './ControlMusicRight';
import { useSelector } from 'react-redux';
import { currentSongSelector } from '~/redux/selector';
const cx = classNames.bind(styles);

function ControlMusic() {
    const currentSongId = useSelector(currentSongSelector);
    console.log(currentSongId);

    return (
        <div className={cx('wrapper')}>
            <div className="grid row">
                <div className="col l-3 m-3">
                    <ControlMusicLeft />
                </div>
                <div className="col l-6 m-6">
                    <ControlMusicCenter />
                </div>
                <div className="col l-3 m-3">
                    <ControlMusicRight />
                </div>
            </div>
        </div>
    );
}

export default ControlMusic;
