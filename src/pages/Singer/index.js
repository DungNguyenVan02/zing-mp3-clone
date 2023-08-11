import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import * as apis from '~/services';
import Button from '~/components/Button/Button';
import Title from '~/components/Section/component/Title';
import { LogoTagIcon, PlayIcon } from '~/components/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Artists, Section, SectionNewMusic, InfoArtists } from '~/components/Section';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function Singer() {
    const dispatch = useDispatch();
    const { singer } = useParams();
    const [artist, setArtist] = useState({});

    const refEl = useRef();

    useEffect(() => {
        dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getArtist(singer);
            if (response.err === 0) {
                setArtist(response);
                dispatch(actions.setLoadingPage(false));
            }
        };
        singer && fetchApi();

        refEl.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singer]);

    return (
        <div className={cx('wrapper')}>
            <div ref={refEl} className={cx('banner')}>
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
            <div>
                <SectionNewMusic data={artist?.data?.sections.find((item) => item.sectionId === 'aSongs')} artistData />
                <Section data={artist?.data?.sections[1]} />
                <Section data={artist?.data?.sections[3]} />
                <Section data={artist?.data?.sections[4]} />
                <div>
                    <Title title={'Có Thể Bạn Sẽ Thích'} />
                    <Artists data={artist?.data?.sections[5]?.items} />
                </div>
                <InfoArtists data={artist.data} />
            </div>
        </div>
    );
}

export default Singer;
