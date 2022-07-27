import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function CarouselSlider(props) {
  const { imageList } = props;
  //  SwiperCore.use([Autoplay]);

  return (
    <div className="relative p-8 max-h-[500px]">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
     autoplay
      >
        {imageList.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              key={i}
              className="h-[436px] w-full rounded-lg object-cover"
              src={item}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
