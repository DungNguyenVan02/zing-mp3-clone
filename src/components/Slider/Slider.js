import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import { useSelector } from 'react-redux';
import { bannerSelector } from '~/redux/selector';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const cx = classNames.bind(styles);

function Slider() {
    const bannerList = useSelector(bannerSelector);

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
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={25}
                slidesPerView={3}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 1000 }}
                loop={true}
            >
                {render}
            </Swiper>
        </div>
    );
}

export default Slider;
