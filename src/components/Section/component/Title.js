import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from '../Section.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Title({ data }) {
    return (
        <div className={cx('header')}>
            <h3 className={cx('main-title')}>{data?.title}</h3>
            <Button className={cx('all-btn')} textBtn rightIcon={<FontAwesomeIcon icon={faChevronRight} />}>
                Tất cả
            </Button>
        </div>
    );
}

export default memo(Title);