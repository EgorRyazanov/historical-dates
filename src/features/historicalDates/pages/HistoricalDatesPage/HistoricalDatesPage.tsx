import { FC, useEffect, useState } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { CirclePoint } from '../../components/CirclePoint';
import { calculateCirclePointCords } from '../../../../utils/calculateCirclePointOrder';
import { rotate } from '../../../../utils/animations/rotateAnimation';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import styles from './HistoricalDatesPage.module.scss';

interface Info {
	title: string;
	id: number;
}

const data: Info[] = [
	{ title: 'dads', id: 1 },
	{ title: 'dsdsds', id: 2 },
	{ title: '1231', id: 3 },
	{ title: 'fsf', id: 4 },
	{ title: 'rwrw', id: 5 },
	{ title: 'dasfaf', id: 6 },
];

const deafultSize = { inactive: 6, active: 56 };

const HistoricalDatesPageComponent: FC = () => {
	// используется useState вместо ref, чтобы предотвратить ошибки с null
	const [circleElement, setCircleElement] = useState<HTMLDivElement | null>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const generateClassName = (id: number): string => {
		return `point-${id}`;
	};

	useEffect(() => {
		if (circleElement) {
			const angle = (360 / data.length) * activeIndex;
			data.map((item) => {
				rotate(generateClassName(item.id), angle, DEFAULT_ANIMATION_TIME);
			});
			rotate(circleElement, -angle, DEFAULT_ANIMATION_TIME);
		}
	}, [activeIndex]);

	return (
		<div className={styles['dates-container']}>
			<div ref={setCircleElement} className={styles['dates-circle']}>
				{data.map((item, index) => {
					const point = calculateCirclePointCords(index, circleElement, data.length);
					if (point != null) {
						return (
							<CirclePoint
								key={item.id}
								index={index}
								point={point}
								title={item.title}
								size={deafultSize}
								isActive={activeIndex === index}
								setActiveIndex={setActiveIndex}
								controlClassName={generateClassName(item.id)}
							/>
						);
					}
				})}
			</div>
		</div>
	);
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
