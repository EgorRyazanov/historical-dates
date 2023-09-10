import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import { typedMemo } from '../../../../utils/typedMemo';
import { DefaultArrowButton } from '../../../../components/DefaultArrowButton';
import { ButtonRotataion } from '../../../../utils/buttonRotation';
import { Info } from '../../pages/HistoricalDatesPage/HistoricalDatesPage';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import { setNumberPrefix } from '../../../../utils/setNumberPrefix';
import styles from './HistoricalDatesSlider.module.scss';

enum ButtonEventValue {
	Previos = -1,
	Next = 1,
}

interface HistoricalDatesSliderComponentProps {
	info: Info[];
	setActiveItemId: (id: Info['id']) => void;
	activeItemId: number;
}

const HistoricalDatesSliderComponent: FC<HistoricalDatesSliderComponentProps> = ({
	info,
	setActiveItemId,
	activeItemId,
}) => {
	const [order, setOrder] = useState(0);
	const [isButtonsDisabled, setButtonsDisabled] = useState(false);

	const calculateOrder = (): number => {
		const item = info.find((item) => item.id === activeItemId);
		if (item != null) {
			return info.indexOf(item) + 1;
		}
		return 0;
	};

	const handleClick = (value: ButtonEventValue) => {
		const nextItemIndex = order + value - 1;
		setActiveItemId(info[nextItemIndex].id);
	};

	useEffect(() => {
		setButtonsDisabled(true);
		setOrder(calculateOrder());
		setTimeout(() => {
			setButtonsDisabled(false);
		}, DEFAULT_ANIMATION_TIME * 1000);
	}, [activeItemId]);

	return (
		<div>
			<span className={styles.order}>
				{setNumberPrefix(order)}/{setNumberPrefix(info.length)}
			</span>
			<div className={styles['buttons-container']}>
				<DefaultArrowButton
					onClick={() => handleClick(ButtonEventValue.Previos)}
					isDisabled={order === 1 || isButtonsDisabled}
					rotation={ButtonRotataion.Left}
				/>
				<DefaultArrowButton
					onClick={() => handleClick(ButtonEventValue.Next)}
					isDisabled={order === info.length || isButtonsDisabled}
					rotation={ButtonRotataion.Right}
				/>
			</div>
			<Swiper
				grabCursor={true}
				// centeredSlides={true}
				// slidesPerView={1}
				// spaceBetween={50}
				// navigation={{
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev',
				// }}
				className="swiper_container"
			>
				<SwiperSlide>
					<div className={styles.slide}>1</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}></div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={styles.slide}>3</div>
				</SwiperSlide>

				{/* <div className="slider-controler">
					<div className="swiper-button-prev slider-arrow">
						<button>s</button>
					</div>
					<div className="swiper-button-next slider-arrow">
						<button>basdadadasd</button>
					</div>
					<div className="swiper-pagination"></div>
				</div> */}
			</Swiper>
		</div>
	);
};

export const HistoricalDatesSlider = typedMemo(HistoricalDatesSliderComponent);
