import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as apis from '~/services';
import Button from '~/components/Button/Button';
import { LogoTagIcon, PlayIcon } from '~/components/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Singer() {
    const { singer } = useParams();
    const [artist, setArtist] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await apis.getArtist(singer);
            if (response.err === 0) {
                setArtist(response);
            }
        };
        singer && fetchApi();
    }, [singer]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('banner')}>
                    <img src={artist?.data?.cover} alt={artist?.data?.name} className={cx('banner-img')} />
                    <div className={cx('overlay')}></div>
                    <div className={cx('inner')}>
                        <div className={cx('content-left')}>
                            <div className={cx('info')}>
                                <h3 className={cx('info-name')}>{artist?.data?.name}</h3>
                                <Button className={cx('info-btn')} circle>
                                    <PlayIcon width="2.6rem" height="2.6rem" />
                                </Button>
                            </div>
                            <div>
                                <span className={cx('follower')}>{` ${Number(
                                    artist?.data?.totalFollow.toFixed(1),
                                ).toLocaleString()} người quan tâm`}</span>
                                <Button
                                    outline
                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                    className={cx('btn-follower')}
                                >
                                    Quan tâm
                                </Button>
                            </div>
                        </div>
                        <div className={cx('content-right')}>
                            <LogoTagIcon width="4.2rem" height="4.4rem" />
                        </div>
                    </div>
                </div>
            </div>
            {/* {artist?.sections?.map((data, index) => )} */}
        </div>
    );
}

export default Singer;
