import classNames from 'classnames/bind';
import styles from './SectionTop.module.scss';
import { PlayIcon } from '~/components/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '~/redux/actions';

const cx = classNames.bind(styles);

function SectionTopItem({ songData, top }) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(actions.setCurrentSongId(songData.encodeId));
    };
    return (
        <div className={cx('section-top-card')}>
            <div className={cx('wrap-img')} onClick={handleClick}>
                <img className={cx('img')} src={songData?.thumbnail} alt={songData?.title} />
                <div className={cx('option')}>
                    <PlayIcon />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{songData?.title}</h3>
                    <span className={cx('sub-title')}>{songData?.artistsNames}</span>
                </div>
                <div className={cx('level')}>
                    <h2>{`#${top}`}</h2>
                    <span>{moment.unix(songData?.releaseDate).format('DD.MM.YYYY')}</span>
                </div>
            </div>
        </div>
    );
}

export default SectionTopItem;
