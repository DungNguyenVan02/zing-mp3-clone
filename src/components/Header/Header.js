import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import Button from '../Button/Button';
import { SettingIcon, DownLoadIcon } from '../icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <div className={cx('container-arrow')}>
                    <FontAwesomeIcon className={cx('icon-arrow')} icon={faArrowLeft} />
                    <FontAwesomeIcon className={cx('icon-arrow')} icon={faArrowRight} />
                </div>
                <Search />
            </div>
            <div className={cx('header-right')}>
                <Button circle>
                    <SettingIcon />
                </Button>
                <Button circle>
                    <img src={images.user} alt="user" className={cx('user-avatar')} />
                </Button>
            </div>
        </div>
    );
}

export default Header;
