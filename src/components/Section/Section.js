import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import SectionItem from './SectionItem';
import Title from './component/Title';
const cx = classNames.bind(styles);
function Section({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Title data={data} />
            <div className={cx('content', 'grid row')}>
                {data?.items
                    ?.filter((item, index) => index < 5)
                    ?.map((item) => (
                        <SectionItem key={item?.encodeId} data={item} />
                    ))}
            </div>
        </div>
    );
}

export default memo(Section);
