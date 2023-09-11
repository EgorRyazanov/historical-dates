import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { clsx } from 'clsx';
import 'swiper/css';

import { typedMemo } from '../../../../utils/typedMemo';
import { DefaultArrowButton } from '../../../../components/DefaultArrowButton';
import { ButtonRotataion } from '../../../../utils/buttonRotation';
import { EventPeriod, Info } from '../../pages/HistoricalDatesPage/HistoricalDatesPage';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import { setNumberPrefix } from '../../../../utils/setNumberPrefix';
import { HistoricalDateSlide } from '../HistoricalDateSlide/HistoricalDateSlide';
import { PaginationArrowButton } from '../../../../components/PaginationButton';
import { ascentAnimation } from '../../../../utils/animations/ascentingAnimation';
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

const DEFAULT_SLIDER_PER_VIEW = 3;

const HistoricalDatesSliderComponent: FC<HistoricalDatesSliderComponentProps> = ({
	info,
	setActiveItemId,
	activeItemId,
}) => {
	const [order, setOrder] = useState(0);
	const [isButtonsDisabled, setButtonsDisabled] = useState(false);
	const [activeSliderIndex, setActiveSliderIndex] = useState(0);
	const [activeEvents, setActiveEvents] = useState<null | EventPeriod[]>(null);

	const updateIndex = (swiperInstance: SwiperType) => {
		if (swiperInstance != null) {
			const currentSlideIndex = swiperInstance?.activeIndex;
			setActiveSliderIndex(currentSlideIndex);
		}

		return null;
	};

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
		ascentAnimation(styles.slider, 1, 0, 0, 30, DEFAULT_ANIMATION_TIME);
		ascentAnimation(styles.slider, 0, 1, 30, 0, DEFAULT_ANIMATION_TIME, DEFAULT_ANIMATION_TIME);
		setButtonsDisabled(true);
		setOrder(calculateOrder());
		setActiveEvents(info[calculateOrder() - 1].events);
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
			{activeEvents != null && (
				<Swiper
					grabCursor={true}
					modules={[Navigation]}
					slidesPerView={DEFAULT_SLIDER_PER_VIEW}
					className={styles.slider}
					onInit={() => {
						ascentAnimation(styles.slider, 0, 1, 30, 0, DEFAULT_ANIMATION_TIME);
					}}
					onActiveIndexChange={updateIndex}
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
				>
					{activeEvents.map((event, index) => {
						return (
							<SwiperSlide key={index}>
								<HistoricalDateSlide year={event.year} description={event.description} />
							</SwiperSlide>
						);
					})}
					<PaginationArrowButton
						className={clsx('swiper-button-prev', styles['slider-button_prev'], styles['slider-button'], {
							[styles['slider-button_disabled']]: activeSliderIndex === 0,
						})}
						isDisabled={false}
						rotation={ButtonRotataion.Left}
					/>
					<PaginationArrowButton
						className={clsx('swiper-button-next', styles['slider-button_next'], styles['slider-button'], {
							[styles['slider-button_disabled']]: activeSliderIndex === activeEvents.length - DEFAULT_SLIDER_PER_VIEW,
						})}
						isDisabled={false}
						rotation={ButtonRotataion.Right}
					/>
				</Swiper>
			)}
		</div>
	);
};

export const HistoricalDatesSlider = typedMemo(HistoricalDatesSliderComponent);
