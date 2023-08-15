import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Top100.module.scss';
import { Top100Icon } from '~/components/icons';
import * as apis from '~/services';
import * as actions from '~/redux/actions';
import { Section } from '~/components/Section';

const cx = classNames.bind(styles);

function Top100() {
    const dispatch = useDispatch();
    const [dataTop100, setDataTop100] = useState([]);
    useEffect(() => {
        dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getTop100();
            if (response?.err === 0) {
                setDataTop100(response?.data);
                dispatch(actions.setLoadingPage(false));
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div className={cx('banner')}>
                <Top100Icon />
            </div>
            <div>
                {dataTop100.map((item, index) => (
                    <Section key={index} data={item} quantity={99} />
                ))}
            </div>
        </div>
    );
}

export default Top100;
