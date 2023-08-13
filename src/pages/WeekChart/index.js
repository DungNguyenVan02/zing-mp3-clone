import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './WeekChart.module.scss';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import { PlayIcon } from '~/components/icons';
import ListItem from '~/components/ListSong/ListItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function WeekChart() {
    const { id } = useParams();
    const { weekChart } = useSelector((state) => state.music);
    const refEl = useRef();
    useEffect(() => {
        refEl.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [id]);
    return (
        <div className={cx('wrapper')} ref={refEl}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h3>Bảng Xếp Hạng Tuần</h3>
                    <Button className={cx('btn')} circle>
                        <PlayIcon />
                    </Button>
                </div>
                <div className={cx('menu')}>
                    {weekChart?.map((item) => (
                        <NavLink
                            to={item?.link.split('.')[0]}
                            key={item?.chartId}
                            className={(nav) =>
                                cx('item', {
                                    active: nav.isActive,
                                })
                            }
                        >
                            {item?.country === 'vn' ? 'VIỆT NAM' : item?.country === 'us' ? 'US-UK' : 'K-POP'}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div>
                {weekChart
                    ?.find((item) => item?.link.includes(id))
                    ?.items?.map((item, index) => (
                        <ListItem key={index} songData={item} order={index + 1} />
                    ))}
            </div>
        </div>
    );
}

export default WeekChart;
