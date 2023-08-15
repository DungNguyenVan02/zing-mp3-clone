import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './NewRelease.module.scss';
import * as actions from '~/redux/actions';
import * as apis from '~/services';
import Button from '~/components/Button';
import { PlayIcon } from '~/components/icons';
import ListItem from '~/components/ListSong/ListItem';

const cx = classNames.bind(styles);

function NewRelease() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    useEffect(() => {
        dispatch(actions.setLoadingPage(true));
        const fetchApi = async () => {
            const response = await apis.getNewRelease();
            if (response?.err === 0) {
                setData(response?.data?.items);
                dispatch(actions.setLoadingPage(false));
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h3>BXH Nhạc Mới</h3>
                    <Button className={cx('btn')} circle>
                        <PlayIcon />
                    </Button>
                </div>
            </div>
            {data?.map((item, index) => (
                <ListItem key={item.encodeId} songData={item} order={index + 1} />
            ))}
        </div>
    );
}

export default NewRelease;
