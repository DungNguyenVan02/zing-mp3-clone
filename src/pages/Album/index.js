import classNames from 'classnames/bind';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Album.module.scss';
import * as apis from '~/services';
import { HeartIcon, MenuIcon, PlayIcon } from '~/components/icons';
import Button from '~/components/Button';
import ListSong from '~/components/ListSong';

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                <div className={cx('wrapper-right')}>
                    <div className={cx('wrapper-right-header')}>
                        <h4>Lời tựa</h4>
                        <h4>{playList?.sortDescription}</h4>
                    </div>
                    <ListSong songs={playList?.song} />
                </div>
            </div>
            <div style={{ height: 600 }}>hhhhh</div>
        </div>
    );
}

export default Album;
