import classNames from 'classnames/bind';
import styles from './RankList.module.scss';
import { useState, memo } from 'react';
import ListItem from '../ListSong/ListItem';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function RankList({ data }) {
    const [showMore, setShowMore] = useState(false);
    return (
        <div>
            {data?.data?.RTChart?.items
                ?.filter((i, index) => (showMore ? i : index <= 9))
                .map((item, index) => (
                    <ListItem key={item.encodeId} songData={item} order={index + 1} />
                ))}
            {
                <Button className={cx('btn-show')} outline onClick={() => setShowMore(!showMore)}>
                    {showMore ? ' Ẩn bớt' : 'Xem top 100'}
                </Button>
            }
        </div>
    );
}

export default memo(RankList);
