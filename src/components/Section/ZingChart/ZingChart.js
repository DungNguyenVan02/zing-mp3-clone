import classNames from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, memo, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import config from '~/config/routes';

import styles from './ZingChart.module.scss';
import Button from '~/components/Button/Button';
import { PlayIcon } from '~/components/icons';
import images from '~/assets/images';
import Media from '~/components/Media';
import { isEqual } from 'lodash';

const cx = classNames.bind(styles);
const ZingChart = memo(({ data, chart, rank }) => {
    const navigate = useNavigate();
    const [dataChart, setDataChart] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [selected, setSelected] = useState(null);

    const chartRef = useRef();
    const options = {
        responsive: true,
        pointRadius: 4,
        maintainAspectRatio: false,
        animations: {
            radius: {
                duration: 500,
                easing: 'linear',
                loop: (context) => context.active,
            },
        },
        scales: {
            y: {
                ticks: { display: false },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawTicks: false,
                },
                min: `${chart?.minScore}`,
                max: `${chart?.maxScore}`,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: {
                    color: 'rgba(255,255,255,0.6)',
                    callback: function (val, index) {
                        return index % 2 === 0 ? this.getLabelForValue(val) : '';
                    },
                },
                grid: { color: 'transparent' },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                events: ['click'],

                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                            return;
                        }
                    }
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]].map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }
                    const rs = counters.find((item) =>
                        item.data.some((item) => item === +tooltip.body[0]?.lines[0]?.replace(',', '')),
                    );
                    console.log(rs.encodeId);
                    setSelected(rs.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
    };
    useEffect(() => {
        const labels = chart?.times?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]].map((item) => item.counter),
                    borderColor: i === 0 ? '#5192e3' : i === 1 ? '#2fba98' : '#a94757',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                });
            }
        }
        setDataChart({ labels, datasets });
    }, [chart]);

    const handleClick = (item) => {
        const path = item?.link?.split('.')[0];
        navigate(path);
    };
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('content-top')}
                style={{ background: `url(${images.bgChart}) top center / cover no-repeat` }}
            >
                <div className={cx('chart-poster')}>
                    <Link to={config.zingChart.path} className={cx('header')}>
                        <h3 className={cx('header-title')}>#zingchart</h3>
                        <Button circle className={cx('header-icon')}>
                            <PlayIcon height="1.8rem" width="1.8rem" />
                        </Button>
                    </Link>
                    <div className={cx('body', 'grid row')}>
                        <div className={cx('content-left', 'col l-4')}>
                            <div className={cx('rank')}>
                                {rank
                                    ?.filter((item, index) => index <= 2)
                                    ?.map((song, index) => (
                                        <Media
                                            className={cx('rank-item')}
                                            key={song.encodeId}
                                            songData={song}
                                            order={index + 1}
                                            percent={`${Math.round((song?.score / chart?.totalScore) * 100)}%`}
                                        />
                                    ))}
                                <Link to={config.zingChart.path} style={{ textAlign: 'center' }}>
                                    <Button large outline className={cx('rank-more')}>
                                        Xem thêm
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('content-right', 'col l-8')}>
                            <div className={cx('chart')} style={{ position: 'relative' }}>
                                {dataChart && <Line ref={chartRef} options={options} data={dataChart} />}
                                <div
                                    className="tooltip"
                                    style={{
                                        position: 'absolute',
                                        top: tooltipState.top,
                                        left: tooltipState.left,
                                        opacity: tooltipState.opacity,
                                    }}
                                >
                                    <Media
                                        className={cx('rank-item-chart')}
                                        songData={rank?.find((i) => i.encodeId === selected)}
                                        percent={`${Math.round(
                                            (rank?.find((i) => i.encodeId === selected)?.score / chart?.totalScore) *
                                                100,
                                        )}%`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('content-bottom', 'grid row')}>
                {data?.items?.map((item) => (
                    <div className="col l-4 m-4 s-12" key={item?.link} onClick={() => handleClick(item)}>
                        <figure className={cx('wrap-img')}>
                            <img className={cx('img')} src={item?.cover} alt="" />
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default memo(ZingChart);
