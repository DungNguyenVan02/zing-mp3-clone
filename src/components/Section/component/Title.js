import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from '../Section.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Title({ data, title, quantity, link }) {
    return (
        <div className={cx('header')}>
            <h3 className={cx('main-title')}>{title ? title : data?.title}</h3>
            {quantity > 7 ? (
                <></>
            ) : (
                !link?.includes('Chill') &&
                link && (
                    <Link to={link}>
                        <Button className={cx('all-btn')} textBtn rightIcon={<FontAwesomeIcon icon={faChevronRight} />}>
                            Tất cả
                        </Button>
                    </Link>
                )
            )}
        </div>
    );
}

export default memo(Title);
