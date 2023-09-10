import { FC, useEffect, useState } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import { rotate } from '../../../../utils/animations/rotateAnimation';
import { calculateCirclePointCords } from '../../../../utils/calculateCirclePointOrder';
import { CirclePoint } from '../CirclePoint';
import { PointSize } from '../../../../utils/models/point';
import styles from './DatesCircle.module.scss';
import { DateCircleItem } from '../../pages/HistoricalDatesPage/HistoricalDatesPage';

const defaultSize: PointSize = { inactiveSize: 6, activeSize: 56 };

interface DatesCircleComponentProps {
	id: string;
	info: DateCircleItem[];
	activeItemId: DateCircleItem['id'];
	pointSize?: PointSize;
	setActiveItemId: (id: DateCircleItem['id']) => void;
}

const DatesCircleComponent: FC<DatesCircleComponentProps> = ({
	pointSize,
	id,
	info,
	activeItemId,
	setActiveItemId,
}) => {
	// Используется useState вместо ref, чтобы предотвратить ошибки с null.
	const [circleElement, setCircleElement] = useState<HTMLDivElement | null>(null);

	const generateClassName = (itemId: number): string => {
		return `point-${itemId}${id}`;
	};

	useEffect(() => {
		const activeItem = info.find((item) => item.id === activeItemId);
		if (circleElement != null && activeItem != null) {
			const activeIndex = info.indexOf(activeItem);
			const rotateAngle = (360 / info.length) * activeIndex;
			info.map((item) => {
				rotate(generateClassName(item.id), rotateAngle, DEFAULT_ANIMATION_TIME);
			});
			rotate(circleElement, -rotateAngle, DEFAULT_ANIMATION_TIME);
		}
	}, [activeItemId]);

	return (
		<div ref={setCircleElement} className={styles['dates-circle']}>
			{info.map((item, index) => {
				const point = calculateCirclePointCords(index, circleElement, info.length);
				if (point != null) {
					return (
						<CirclePoint
							key={item.id}
							id={item.id}
							index={index}
							point={point}
							title={item.title}
							size={pointSize ?? defaultSize}
							isActive={item.id === activeItemId}
							setActiveItemId={setActiveItemId}
							controlClassName={generateClassName(item.id)}
						/>
					);
				}
			})}
		</div>
	);
};

export const DatesCircle = typedMemo(DatesCircleComponent);
