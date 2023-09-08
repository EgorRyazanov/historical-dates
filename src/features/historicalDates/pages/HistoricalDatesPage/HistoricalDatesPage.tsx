import { FC, useEffect, useState } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { CirclePoint } from '../../components/CirclePoint/CirclePoint';
import { Cubic, gsap } from 'gsap';
import styles from './HistoricalDatesPage.module.scss';

interface Info {
	title: string;
}

const data: Info[] = [
	{ title: 'dads' },
	{ title: 'dsdsds' },
	{ title: '1231' },
	{ title: 'fsf' },
	{ title: 'rwrw' },
	{ title: 'dasfaf' },
];

const HistoricalDatesPageComponent: FC = () => {
	// используется useState вместо ref, чтобы предотвратить ошибки с null
	const [circleElement, setCircleElement] = useState<HTMLDivElement | null>(null);
	const [currentOrder, setCurrentOrder] = useState<number>(0);

	const calculatePointCords = (order: number): { x: number; y: number } | null => {
		if (circleElement != null) {
			const circleDiameter = circleElement.offsetHeight;
			const angle = (360 / data.length) * order;
			const x = Math.round(circleDiameter / 2 + (circleDiameter / 2) * Math.cos((angle * Math.PI) / 180));
			const y = Math.round(circleDiameter / 2 + (circleDiameter / 2) * Math.sin((angle * Math.PI) / 180));
			return { x, y };
		}
		return null;
	};

	const rotate = () => {
		if (circleElement) {
			const angle = (360 / data.length) * currentOrder;
			gsap.to(circleElement, {
				duration: 1,
				rotation: angle,
				ease: Cubic.easeInOut,
			});
		}
	};

	useEffect(() => {
		rotate();
	}, [currentOrder]);

	return (
		<div className={styles['dates-container']}>
			<div ref={setCircleElement} className={styles['dates-circle']}>
				{data.map((item, index) => {
					const point = calculatePointCords(index + 1);
					if (point != null) {
						// генеририовать key
						return (
							<CirclePoint setCurrentOrder={setCurrentOrder} point={point} item={item} key={index} index={index} />
						);
					}
				})}
			</div>
		</div>
	);
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
