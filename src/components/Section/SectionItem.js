import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Section.module.scss';
import Button from '../Button';
import { PlayIcon, HeartIcon, MenuIcon } from '../icons';

const cx = classNames.bind(styles);
function SectionItem({ data }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const path = data?.link.split('.')[0];

        navigate(path);
    };

    return (
        <div className={cx('section-card', 'col l-2-4')}>
            <div onClick={handleClick}>
                <figure className={cx('wrap-img')}>
                    <img className={cx('img')} src={data?.thumbnailM} alt="" />
                    <div className={cx('option')}>
                        <Button circle className={cx('heart')}>
                            <HeartIcon />
                        </Button>
                        <Button circleOutline>
                            <PlayIcon />
                        </Button>
                        <Button circle className={cx('more')}>
                            <MenuIcon />
                        </Button>
                    </div>
                </figure>
            </div>
            <div className={cx('section-content')}>
                <h3 className={cx('sub-title')}>{data.sortDescription}</h3>
            </div>
        </div>
    );
}

export default SectionItem;
