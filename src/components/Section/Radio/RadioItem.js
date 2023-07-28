import classNames from 'classnames/bind';
import styles from './Radio.module.scss';
import { PlayIcon } from '~/components/icons';

const cx = classNames.bind(styles);
function RadioItem({ radioData }) {
    return (
        <div className={cx('radio-item')}>
            <div className={cx('content-top')}>
                <div className={cx('wrap-img')}>
                    <img className={cx('img-link')} src={radioData?.program?.thumbnail} alt="" />
                </div>
                <div className={cx('icon')}>
                    <PlayIcon width="2.8rem" height="2.8rem" />
                </div>
                <img className={cx('sub-img')} src={radioData?.thumbnailM} alt="" />
                <span className={cx('live')}>live</span>
            </div>
            <div className={cx('content-bottom')}>
                <h3 className={cx('title')}>{radioData?.host?.name}</h3>
                <p className={cx('use-listening')}>{`${
                    radioData?.activeUsers > 1000
                        ? Math.floor(radioData?.activeUsers / 1000) + 'K'
                        : radioData?.activeUsers
                } đang xem`}</p>
            </div>
        </div>
    );
}

export default RadioItem;
