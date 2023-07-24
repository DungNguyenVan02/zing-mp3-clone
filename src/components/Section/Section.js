import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import SectionItem from './SectionItem';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Section({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{data?.title}</h3>
                <Button className={cx('all-btn')} textBtn rightIcon={<FontAwesomeIcon icon={faChevronRight} />}>
                    Tất cả
                </Button>
            </div>
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
