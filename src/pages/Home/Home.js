import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import * as actions from '~/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '~/components/Slider';
import { Section, SectionNewMusic, SectionTop, ZingChart, Radio } from '~/components/Section';
const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const {
        editorTheme1,
        editorTheme2,
        editorTheme3,
        editorTheme4,
        editorTheme5,
        editorTheme6,
        editorTheme7,
        editorTheme8,
        editorTheme9,
        editorTheme10,
        editorTheme11,
        chart,
        rank,
    } = useSelector((state) => state.home);
    useEffect(() => {
        dispatch(actions.getHome());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Slider />
            <SectionNewMusic data={editorTheme1} />
            <Section data={editorTheme2} />
            <Section data={editorTheme3} />
            <Section data={editorTheme4} />
            <Section data={editorTheme5} />
            <Section data={editorTheme6} />
            <SectionTop data={editorTheme7} />
            <ZingChart data={editorTheme8} chart={chart} rank={rank} />
            <Section data={editorTheme9} />
            <Section data={editorTheme10} />
            <Radio data={editorTheme11} />
        </div>
    );
}

export default Home;
