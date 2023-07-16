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
    const [songInfo, setSongInfo] = useState({});
    const [songSource, setsSongSource] = useState({});
    useEffect(() => {
        const fetchApi = async () => {
            const [res1, res2] = await Promise.all([apis.getInfo(currentSongId), apis.getSong(currentSongId)]);
            if (res1.err === 0) {
                setSongInfo(res1.data);
            }
            if (res2.err === 0) {
                setsSongSource(res2.data['128']);
            }
        };
        fetchApi();
    }, [currentSongId, songSource]);

    return (
        <div className={cx('wrapper')}>
            <div className="grid row">
                <div className="col l-3 m-3">
                    <ControlMusicLeft data={songInfo} />
                </div>
                <div className="col l-6 m-6">
                    <ControlMusicCenter data={songSource} />
                </div>
                <div className="col l-3 m-3">
                    <ControlMusicRight />
                </div>
            </div>
        </div>
    );
}

export default ControlMusic;
