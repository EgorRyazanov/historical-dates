import { FC, useEffect, useState } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import { rotate } from '../../../../utils/animations/rotateAnimation';
import { calculateCirclePointCords } from '../../../../utils/calculateCirclePointOrder';
import { CirclePoint } from '../CirclePoint';
import { PointSize } from '../../../../utils/models/point';
import styles from './DatesCircle.module.scss';

interface Info {
	title: string;
	id: number;
}

const deafultSize: PointSize = { inactiveSize: 6, activeSize: 56 };

const data: Info[] = [
	{ title: 'dads', id: 1 },
	{ title: 'dsdsds', id: 2 },
	{ title: '1231', id: 3 },
	{ title: 'fsf', id: 4 },
	{ title: 'rwrw', id: 5 },
	{ title: 'dasfaf', id: 6 },
];

interface DatesCircleComponentProps {
	pointSize?: PointSize;
}

const DatesCircleComponent: FC<DatesCircleComponentProps> = ({ pointSize }) => {
	// Используется useState вместо ref, чтобы предотвратить ошибки с null.
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
							size={pointSize ?? deafultSize}
							isActive={activeIndex === index}
							setActiveIndex={setActiveIndex}
							controlClassName={generateClassName(item.id)}
						/>
					);
				}
			})}
		</div>
	);
};

export const DatesCircle = typedMemo(DatesCircleComponent);
