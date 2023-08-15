import classNames from 'classnames/bind';
import styles from './ZingChart.module.scss';
import { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import * as apis from '~/services';
import Button from '~/components/Button';
import { PlayIcon } from '~/components/icons';
import Media from '~/components/Media/Media';
import RankList from '~/components/RankList';
import ListItem from '~/components/ListSong/ListItem';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function ZingChart() {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState(null);
    const [dataDraw, setDataDraw] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getChart();
            if (response?.err === 0) {
                setChartData(response);
                dispatch(actions.setLoadingPage(false));
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        chartData?.data?.weekChart && dispatch(actions.setWeekChart(Object.values(chartData?.data?.weekChart)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartData?.data?.weekChart]);

    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });

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
                min: `${chartData?.data?.RTChart?.chart?.minScore}`,
                max: `${chartData?.data?.RTChart?.chart?.maxScore}`,
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
                            data: chartData?.data?.RTChart?.chart?.items[
                                Object.keys(chartData?.data?.RTChart?.chart?.items)[i]
                            ].map((item) => item.counter),
                            encodeId: Object.keys(chartData?.data?.RTChart?.chart?.items)[i],
                        });
                    }
                    const rs = counters.find((item) =>
                        item.data.some((item) => item === +tooltip.body[0]?.lines[0]?.replace(',', '')),
                    );
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
        const labels = chartData?.data?.RTChart?.chart?.times?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chartData?.data?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.data?.RTChart?.chart?.items[
                        Object.keys(chartData?.data?.RTChart?.chart?.items)[i]
                    ].map((item) => item.counter),
                    borderColor: i === 0 ? '#5192e3' : i === 1 ? '#2fba98' : '#a94757',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 3,
                });
            }
        }
        setDataDraw({ labels, datasets });
    }, [chartData]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-top')}>
                <div className={cx('chart-poster')}>
                    <div className={cx('header')}>
                        <h3 className={cx('header-title')}>#zingchart</h3>
                        <Button circle className={cx('header-icon')}>
                            <PlayIcon height="1.8rem" width="1.8rem" />
                        </Button>
                    </div>
                    <div className={cx('chart')} style={{ position: 'relative' }}>
                        {dataDraw && <Line ref={chartRef} options={options} data={dataDraw} />}
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
                                songData={chartData?.data?.RTChart?.items?.find((i) => i.encodeId === selected)}
                                percent
                            />
                        </div>
                    </div>
                </div>
            </div>
            <RankList data={chartData} />
            <div className={cx('rank')}>
                <div className={cx('rank-title')}>
                    <h3>Bảng xếp hạng tuần</h3>
                </div>
                <div className={cx('container', 'grid row')}>
                    {chartData?.data?.weekChart &&
                        Object.entries(chartData?.data?.weekChart).map((item) => {
                            return (
                                <div key={item[0]} className="col l-4 m-12">
                                    <div className={cx('rank-item')}>
                                        <div className={cx('rank-item-title')}>
                                            <h3>
                                                {item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : 'K-Pop'}
                                            </h3>
                                            <Button className={cx('rank-item-btn')} circle>
                                                <PlayIcon width="1.4rem" height="1.4rem" />
                                            </Button>
                                        </div>
                                        <div className={cx('rank-item-container')}>
                                            {item[1]?.items
                                                ?.filter((i, index) => index <= 4)
                                                ?.map((item, index) => (
                                                    <ListItem
                                                        key={item.encodeId}
                                                        songData={item}
                                                        order={index + 1}
                                                        small
                                                    />
                                                ))}
                                            <div className={cx('btn')}>
                                                <Link to={item[1]?.link?.split('.')[0]}>
                                                    <Button className={cx('btn-show')} outline>
                                                        Xem thêm
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default ZingChart;
