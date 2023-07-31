import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarRight.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button/Button';
import { MenuIcon } from '~/components/icons';
import Media from '~/components/Media';
import * as apis from '~/services';
const cx = classNames.bind(styles);

function SidebarRight() {
    const [isRecent, setIsRecent] = useState(0);
    const [albumData, setAlbumData] = useState({});

    const { isOpenSidebar } = useSelector((state) => state.home);
    const { currentAlbumId, currentSongData, recentSongs, isPlaying } = useSelector((state) => state.music);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await apis.getDetailPlayList(currentAlbumId);
            setAlbumData(response);
        };
        currentAlbumId && fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAlbumId]);
    useEffect(() => {
        isPlaying && setIsRecent(false);
    }, [isPlaying]);
    return (
        <div
            className={cx('wrapper', {
                active: isOpenSidebar,
                // active: true,
            })}
        >
            <div className={cx('header')}>
                <div className={cx('wrap-btn')}>
                    <Button
                        onClick={() => setIsRecent(false)}
                        className={cx('btn', {
                            active: !isRecent,
                        })}
                        outline
                    >
                        Danh sách phát
                    </Button>
                    <Button
                        onClick={() => setIsRecent(true)}
                        className={cx('btn', {
                            active: isRecent,
                        })}
                        outline
                    >
                        Nghe gần đây
                    </Button>
                </div>
                <div className={cx('option')}>
                    <Button circle className={cx('option-btn')}>
                        <FontAwesomeIcon icon={faClock} />
                    </Button>
                    <Button circle className={cx('option-btn')}>
                        <MenuIcon height="1.8rem" width="1.8rem" />
                    </Button>
                </div>
            </div>
            <div className={cx('body')}>
                {!isRecent ? (
                    <>
                        <Media songData={currentSongData} small />
                        <div className={cx('wrap-title')}>
                            <h3 className={cx('title')}>Tiếp theo</h3>
                            <span className={cx('sub-title')}>
                                Từ Playlist
                                <strong className={cx('name-title')}> {albumData?.data?.title}</strong>
                            </span>
                        </div>
                        <div className={cx('song-list')}>
                            {albumData?.data?.song?.items?.map((song) => (
                                <div key={song.encodeId} className={cx('song-item')}>
                                    <Media songData={song} small />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>
                        {
                            <div className={cx('song-list-recent')}>
                                {recentSongs?.map((song) => (
                                    <div key={song.encodeId} className={cx('song-item')}>
                                        <Media songData={song} small bgNone />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default SidebarRight;
