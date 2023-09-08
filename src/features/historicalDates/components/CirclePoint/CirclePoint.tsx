import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { Point } from '../../../../utils/models/point';
import { changeOpacity } from '../../../../utils/animations/changeOpacityAnimation';
import { OPACITY_ANIMATION_TIME } from '../../../../utils/consts';
import styles from './CirclePoint.module.scss';

interface CirclePointComponentProps {
	title: string;
	index: number;
	point: Point;
	setActiveIndex: (index: number) => void;
	isActive: boolean;
	size: {
		inactive: number;
		active: number;
	};
	controlClassName?: string;
}

const CirclePointComponent: FC<CirclePointComponentProps> = ({
	title,
	index,
	point,
	setActiveIndex,
	isActive,
	size,
	controlClassName,
}) => {
	const [isHover, setIsHover] = useState(false);
	const [orderElement, setOrderElement] = useState<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (orderElement) {
			changeOpacity(orderElement, isHover || isActive ? 1 : 0, OPACITY_ANIMATION_TIME);
		}
	}, [isActive, isHover, orderElement]);

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				bottom: point.y - size.active / 2,
				left: point.x - size.active / 2,
				width: size.active,
				height: size.active,
			}}
			className={clsx(styles['point-container'], controlClassName)}
		>
			<button
				onClick={() => setActiveIndex(index)}
				style={{
					width: isActive || isHover ? size.active : size.inactive,
					height: isActive || isHover ? size.active : size.inactive,
				}}
				className={clsx(styles.point, { [styles['point_active']]: isActive || isHover })}
			>
				<span className={styles['point-text']} ref={setOrderElement}>
					{index}
				</span>
			</button>
		</div>
	);
};

export const CirclePoint = typedMemo(CirclePointComponent);
