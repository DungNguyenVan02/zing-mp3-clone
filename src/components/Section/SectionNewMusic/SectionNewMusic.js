import classNames from 'classnames/bind';
import styles from './SectionNewMusic.module.scss';
import Title from '../component/Title';
import Button from '~/components/Button';
import { memo, useEffect, useState } from 'react';
import Media from '~/components/Media';

const cx = classNames.bind(styles);

function SectionNewMusic({ data, artistData }) {
    const [active, setActive] = useState(0);
    const [songs, setSongs] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (active === 1) {
            setSongs(data?.items?.vPop);
        } else if (active === 2) {
            setSongs(data?.items?.others);
        } else {
            setSongs(data?.items?.all);
        }
    });
    return (
        <div className={cx('wrapper')}>
            <Title data={data} />
            <div className={cx('content')}>
                {!artistData && (
                    <div className={cx('button')}>
                        <Button
                            onClick={() => setActive(0)}
                            outline
                            small
                            className={cx('btn', {
                                active: active === 0,
                            })}
                        >
                            TẤT CẢ
                        </Button>
                        <Button
                            onClick={() => setActive(1)}
                            outline
                            small
                            className={cx('btn', {
                                active: active === 1,
                            })}
                        >
                            VIỆT NAM
                        </Button>
                        <Button
                            onClick={() => setActive(2)}
                            outline
                            small
                            className={cx('btn', {
                                active: active === 2,
                            })}
                        >
                            QUỐC TẾ
                        </Button>
                    </div>
                )}
                <div className="grid row">
                    {artistData
                        ? data?.items
                              ?.filter((item, index) => index <= 5)
                              .map((song) => {
                                  return (
                                      <div key={song.encodeId} className="col l-6 m-6 s-12">
                                          <Media songData={song} showInfo width="40px" height="40px" />
                                      </div>
                                  );
                              })
                        : songs
                              ?.filter((item, index) => index <= 11)
                              .map((song) => {
                                  return (
                                      <div key={song.encodeId} className="col l-4 m-6 s-12">
                                          <Media songData={song} />
                                      </div>
                                  );
                              })}
                </div>
            </div>
        </div>
    );
}

export default memo(SectionNewMusic);
