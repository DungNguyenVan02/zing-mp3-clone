import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import images from '~/assets/images';
import Button from '~/components/Button';
import { FacebookIcon, GoogleIcon } from '~/components/icons';
import * as actions from '~/redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { auth, fbProvider, ggProvider } from '~/firebase/config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocument } from '~/firebase/services';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {}, []);

    const handleGgLogin = () => {
        signInWithPopup(auth, ggProvider)
            .then((result) => {
                console.log(result);
                const additionalUserInfo = getAdditionalUserInfo(result);
                if (additionalUserInfo?.isNewUser) {
                    const newUserInfo = {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        uid: result.user.uid,
                        providerId: result.providerId,
                    };
                    addDocument('users', newUserInfo);
                }
                toast.success('Đăng nhập thành công!');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFbLogin = () => {
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                console.log(result.user);
                dispatch(actions.setUser(result.user));

                toast.success('Đăng nhập thành công!');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('popup')}>
            <div className={cx('inner')}>
                <span
                    className={cx('btn-close')}
                    onClick={() => {
                        dispatch(actions.setOpenPopup(false));
                        navigate('/');
                    }}
                >
                    <FontAwesomeIcon icon={faClose} />
                </span>
                <img className={cx('logo')} src={images.logo} alt="Zing-mp3" />
                <h3 className={cx('title')}>Đăng nhập vào Zing-mp3</h3>
                <div className={cx('option')}>
                    <Button className={cx('btn-login')} textBtn leftIcon={<GoogleIcon />} onClick={handleGgLogin}>
                        Tiếp tục với Google
                    </Button>
                    <Button className={cx('btn-login')} textBtn leftIcon={<FacebookIcon />} onClick={handleFbLogin}>
                        Tiếp tục với FaceBook
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
