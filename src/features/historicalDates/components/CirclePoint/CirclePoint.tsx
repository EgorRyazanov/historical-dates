import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { Point, PointSize } from '../../../../utils/models/point';
import { changeOpacity } from '../../../../utils/animations/changeOpacityAnimation';
import { DEFAULT_ANIMATION_TIME, OPACITY_ANIMATION_TIME } from '../../../../utils/consts';
import styles from './CirclePoint.module.scss';
import { DateCircleItem } from '../../pages/HistoricalDatesPage/HistoricalDatesPage';

interface CirclePointComponentProps {
	title: string;
	id: DateCircleItem['id'];
	index: number;
	point: Point;
	isActive: boolean;
	size: PointSize;
	controlClassName?: string;
	setActiveItemId: (index: DateCircleItem['id']) => void;
}

const CirclePointComponent: FC<CirclePointComponentProps> = ({
	id,
	index,
	title,
	point,
	setActiveItemId,
	isActive,
	size,
	controlClassName,
}) => {
	const [isHover, setIsHover] = useState(false);
	// Используется useState вместо ref, чтобы предотвратить ошибки с null и отлавливать изменения.
	const [orderElement, setOrderElement] = useState<HTMLSpanElement | null>(null);
	const [titleElement, setTitleElement] = useState<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (orderElement != null) {
			changeOpacity(orderElement, isHover || isActive ? 1 : 0, OPACITY_ANIMATION_TIME);
		}
	}, [isActive, isHover, orderElement]);

	useEffect(() => {
		if (titleElement != null) {
			changeOpacity(titleElement, isActive ? 1 : 0, OPACITY_ANIMATION_TIME);
		}
	}, [titleElement]);

	useEffect(() => {
		if (titleElement != null) {
			changeOpacity(
				titleElement,
				isActive ? 1 : 0,
				OPACITY_ANIMATION_TIME,
				isActive ? DEFAULT_ANIMATION_TIME : OPACITY_ANIMATION_TIME
			);
		}
	}, [isActive]);

	return (
		<div
			style={{
				bottom: point.y - size.activeSize / 2,
				left: point.x - size.activeSize / 2,
			}}
			className={clsx(styles.wrapper, controlClassName)}
		>
			<div
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				style={{
					width: size.activeSize,
					height: size.activeSize,
				}}
				className={styles['point-container']}
			>
				<button
					onClick={() => setActiveItemId(id)}
					style={{
						width: isActive || isHover ? size.activeSize : size.inactiveSize,
						height: isActive || isHover ? size.activeSize : size.inactiveSize,
					}}
					className={clsx(styles.point, { [styles['point_active']]: isActive || isHover })}
				>
					<span className={styles['point-text']} ref={setOrderElement}>
						{index + 1}
					</span>
				</button>
			</div>
			<span ref={setTitleElement} className={styles['point-title']}>
				{title}
			</span>
		</div>
	);
};

export const CirclePoint = typedMemo(CirclePointComponent);
