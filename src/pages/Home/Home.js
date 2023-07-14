import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import * as actions from '~/redux/actions';
import { useDispatch } from 'react-redux';
import Slider from '~/components/Slider';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Slider />
        </div>
    );
}

export default Home;
