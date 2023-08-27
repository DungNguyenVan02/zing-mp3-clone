import classNames from 'classnames/bind';
import styles from './MyMusic.module.scss';
import Header from './components/Header';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function Detail() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.newRelease);
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('img-empty')}></div>
                <h3 className={cx('description')}>Chưa có mục yêu thích trong thưu viện</h3>
                <Button onClick={handleClick} primary>
                    Khám phá ngay
                </Button>
            </div>
        </div>
    );
}

export default Detail;
