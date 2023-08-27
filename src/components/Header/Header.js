import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import Search from '../Search';
import Button from '../Button';
import { SettingIcon } from '../icons';
import * as actions from '~/redux/actions';
import { auth } from '~/firebase/config';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const { user, isOpenPopup } = useSelector((state) => state.home);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, uid, photoURL } = user;
                dispatch(
                    actions.setUser({
                        displayName,
                        uid,
                        photoURL,
                    }),
                );
                dispatch(actions.setOpenPopup(false));
            }
        });
        return () => {
            unsubscribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenPopup]);

    const handleShowMore = (attrs) => (
        <div className={cx('option-more')} tabIndex="-1" {...attrs}>
            <Button
                onClick={handleLogout}
                className={cx('option-more-btn')}
                textBtn
                leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            >
                Đăng xuất
            </Button>
        </div>
    );

    const handleLogout = () => {
        auth.signOut();
        dispatch(actions.setUser(null));
        navigate('/');
        toast.info('Đăng xuất thành công!');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <div className={cx('container-arrow')}>
                    <FontAwesomeIcon onClick={() => navigate(-1)} className={cx('icon-arrow')} icon={faArrowLeft} />
                    <FontAwesomeIcon onClick={() => navigate(1)} className={cx('icon-arrow')} icon={faArrowRight} />
                </div>
                <Search />
            </div>
            <div className={cx('header-right')}>
                <Button circle>
                    <SettingIcon />
                </Button>
                {user ? (
                    <HeadlessTippy
                        trigger="click"
                        interactive
                        render={handleShowMore}
                        placement="bottom"
                        offset={[-40, 8]}
                    >
                        <Button circle>
                            <img src={user?.photoURL} alt="user" className={cx('user-avatar')} />
                        </Button>
                    </HeadlessTippy>
                ) : (
                    <Button primary onClick={() => dispatch(actions.setOpenPopup(true))}>
                        Đăng nhập
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
