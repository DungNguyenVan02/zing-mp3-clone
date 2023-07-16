import classNames from 'classnames/bind';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Album.module.scss';
import * as apis from '~/services';
import { HeartIcon, MenuIcon, PlayIcon } from '~/components/icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Album() {
    const { id } = useParams();
    const [playList, setPlayList] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await apis.getDetailPlayList(id);
            if (response.err === 0) {
                setPlayList(response.data);
            }
        };
        fetchApi();
    }, [id]);

    console.log(playList);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-left')}>
                <div className={cx('thumbnail-album')}>
                    <img className={cx('thumbnail-link')} src={playList?.thumbnailM} alt="" />
                    <div className={cx('thumbnail-overlay')}>
                        <PlayIcon width="2.6rem" height="2.6rem" />
                    </div>
                </div>
                <div className={cx('thumbnail-body')}>
                    <h3 className={cx('thumbnail-title')}>{playList?.title}</h3>
                    <p className={cx('thumbnail-update')}>
                        Cập nhật: {moment.unix(playList?.contentLastUpdate).format('DD/MM/YYYY')}
                    </p>
                    <p className={cx('thumbnail-artists')}>{playList?.artistsNames}</p>
                    <p className={cx('thumbnail-like')}>{`${
                        Math.floor(playList?.like / 1000) || '...'
                    }K người yêu thích`}</p>
                </div>
                <Button primary leftIcon={<PlayIcon />}>
                    PHÁT NGẪU NHIÊN
                </Button>
                <div className={cx('thumbnail-select')}>
                    <Button circle>
                        <HeartIcon />
                    </Button>
                    <Button circle>
                        <MenuIcon />
                    </Button>
                </div>
            </div>
            <div className={cx('wrapper-right')}>list</div>
        </div>
    );
}

export default Album;
