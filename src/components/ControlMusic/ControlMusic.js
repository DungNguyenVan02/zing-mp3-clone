import classNames from 'classnames/bind';
import styles from './ControlMusic.module.scss';
import ControlMusicLeft from './ControlMusicLeft';
import ControlMusicCenter from './ControlMusicCenter';
import ControlMusicRight from './ControlMusicRight';
import { useSelector } from 'react-redux';
import { currentSongSelector } from '~/redux/selector';
import { useEffect, useState } from 'react';
import * as apis from '~/services';

const cx = classNames.bind(styles);

function ControlMusic() {
    const currentSongId = useSelector(currentSongSelector);
    const [songInfo, setSongInfo] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await apis.getInfo(currentSongId);
            if (response.err === 0) {
                setSongInfo(response.data);
            }
        };
        fetchApi();
    }, [currentSongId]);

    return (
        <div className={cx('wrapper')}>
            <div className="grid row">
                <div className="col l-3 m-3">
                    <ControlMusicLeft data={songInfo} />
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
