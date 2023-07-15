import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { useSelector } from 'react-redux';
import { bannerSelector } from '~/redux/selector';
import { Pagination, Navigation, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Slider() {
    const bannerList = useSelector(bannerSelector);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const render = bannerList?.map((item, index) => {
        return (
            <SwiperSlide key={index}>
                <img className={cx('item')} src={item.banner} alt="" />
            </SwiperSlide>
        );
    });
    return (
        <div className={cx('wrapper')}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={25}
                slidesPerView={3}
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
