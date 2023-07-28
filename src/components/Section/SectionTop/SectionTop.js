import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SectionTop.module.scss';
import Title from '../component/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import SectionTopItem from './SectionTopItem';

const cx = classNames.bind(styles);

function SectionTop({ data }) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const render = data?.items?.map((song, index) => {
        return (
            <SwiperSlide key={song.encodeId}>
                <SectionTopItem key={song.encodeId} songData={song} top={index + 1} />
            </SwiperSlide>
        );
    });

    return (
        <div className={cx('wrapper')}>
            <Title data={data} />
            <div className={cx('content')}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    spaceBetween={15}
                    loop={true}
                    autoplay={{
                        delay: 3000,
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
        </div>
    );
}

export default SectionTop;
