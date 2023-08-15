import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/redux/actions';
import styles from './Section.module.scss';
import Button from '../Button';
import { Playing } from '../Animation';
import { PlayIcon, HeartIcon, MenuIcon } from '../icons';

const cx = classNames.bind(styles);
function SectionItem({ data }) {
    const { isPlaying, currentAlbumId } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentId = data?.link?.split('.')[0]?.split('/')[3];
    const handleClick = () => {
        const path = data?.link?.split('.')[0];
        navigate(path);
    };
    return (
        <div className={cx('section-card', 'col l-2-4 m-3 s-6')}>
            <div onClick={handleClick}>
                <figure className={cx('wrap-img')}>
                    <img className={cx('img')} src={data?.thumbnailM} alt="" />
                    <div
                        className={cx('option', {
                            iconShow: currentAlbumId === currentId && isPlaying,
                        })}
                    >
                        <Button circle className={cx('heart')}>
                            <HeartIcon />
                        </Button>
                        <Button circleOutline onClick={() => dispatch(actions.setPlayingRandom(true))}>
                            {isPlaying && currentAlbumId === currentId ? <Playing /> : <PlayIcon />}
                        </Button>
                        <Button circle className={cx('more')}>
                            <MenuIcon />
                        </Button>
                    </div>
                </figure>
            </div>
            <div className={cx('section-content')}>
                <h3 className={cx('title')}>{data?.title}</h3>
                <h3 className={cx('sub-title')}>{data?.sortDescription || data?.artistsNames}</h3>
            </div>
        </div>
    );
}

export default SectionItem;
