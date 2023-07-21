import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './ControlMusic.module.scss';
import ControlMusicLeft from './ControlMusicLeft';
import ControlMusicCenter from './ControlMusicCenter';
import ControlMusicRight from './ControlMusicRight';
import { currentSongSelector } from '~/redux/selector';
import * as actions from '~/redux/actions';
import * as apis from '~/services';

const cx = classNames.bind(styles);

function ControlMusic() {
    const dispatch = useDispatch();
    const currentSongId = useSelector(currentSongSelector);
    const [songInfo, setSongInfo] = useState({});
    const [duration, setDuration] = useState(0);
    const [errAudio, setErrAudio] = useState(false);
    const [audio, setAudio] = useState(new Audio());

    useEffect(() => {
        const fetchApi = async () => {
            const [res1, res2] = await Promise.all([apis.getInfo(currentSongId), apis.getSong(currentSongId)]);
            if (res1.err === 0 && res2.err === 0) {
                setSongInfo(res1.data);
                setDuration(res1.data?.duration);
            }
            if (res2.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data['128']));
                setErrAudio(false);
            } else {
                toast.warn(res2.msg);
                dispatch(actions.setPlaying(false));
                setErrAudio(true);
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSongId]);

    return (
        <div className={cx('wrapper')}>
            <div className="grid row">
                <div className="col l-3 m-3">
                    <ControlMusicLeft data={songInfo} />
                </div>
                <div className="col l-6 m-6">
                    <ControlMusicCenter audio={audio} duration={duration} errAudio={errAudio} />
                </div>
                <div className="col l-3 m-3">
                    <ControlMusicRight />
                </div>
            </div>
        </div>
    );
}

export default ControlMusic;
