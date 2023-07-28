import classNames from 'classnames/bind';
import styles from './ZingChart.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function ZingChart({ data }) {
    const navigate = useNavigate();

    const handleClick = (item) => {
        const path = item?.link?.split('.')[0];
        navigate(path);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={'content-top'}></div>
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
}

export default ZingChart;
