import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import * as actions from '~/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '~/components/Slider';
import Section from '~/components/Section';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const { editorTheme1 } = useSelector((state) => state.home);
    useEffect(() => {
        dispatch(actions.getHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Slider />
            <Section data={editorTheme1} />
        </div>
    );
}

export default Home;
