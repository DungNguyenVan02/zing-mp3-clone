import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import * as actions from '~/redux/actions';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bannerSelector } from '~/redux/selector';
import { Pagination, Navigation, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Slider() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const bannerList = useSelector(bannerSelector);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const handleClick = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurrentSongId(item.encodeId));
            dispatch(actions.setPlaying(true));
        } else if (item?.type === 4) {
            const pathAlbum = item.link.split('.')[0];
            navigate(pathAlbum);
        }
    };

    const render = bannerList?.map((item) => {
        return (
            <SwiperSlide key={item.encodeId}>
                <img className={cx('item')} src={item.banner} alt="" onClick={() => handleClick(item)} />
            </SwiperSlide>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={25}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                speed={600}
                allowTouchMove={false}
                scrollbar={{ draggable: false }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        allowTouchMove: true,
                        navigation: false,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        },
                    },
                    600: {
                        slidesPerView: 2,
                        allowTouchMove: true,
                    },
                    1040: {
                        slidesPerView: 3,
                    },
                }}
            >
                {render}
                <button ref={navigationPrevRef} className={cx('btn-prev')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button ref={navigationNextRef} className={cx('btn-next')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </Swiper>
        </div>
    );
}

export default Slider;
