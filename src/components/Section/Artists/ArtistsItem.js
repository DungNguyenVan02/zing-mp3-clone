import classNames from 'classnames/bind';
import styles from './Artists.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useFormat } from '~/components/hooks';
import { SearchIcon } from '~/components/icons';

const cx = classNames.bind(styles);

function ArtistsItem({ data }) {
    const follower = useFormat(data.totalFollow);
    return (
        <div className={cx('artists-item')}>
            <div className={cx('artists-img')}>
                <img className={cx('artists-img-link')} src={data.thumbnail} alt="" />
                <div className={cx('artists-option')}>
                    <SearchIcon width="3rem" height="3rem" />
                </div>
            </div>
            <div className={cx('artists-body')}>
                <h3>{data.name}</h3>
                <p>{`${follower} Quan tâm`}</p>
                <Button className={cx('artists-btn')} outline leftIcon={<FontAwesomeIcon icon={faUserPlus} />}>
                    Quan tâm
                </Button>
            </div>
        </div>
    );
}

export default ArtistsItem;
