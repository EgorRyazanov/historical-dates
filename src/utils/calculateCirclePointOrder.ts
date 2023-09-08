import { Point } from './models/point';

const ANGLE_SIDE_EFFECT = 2;

export const calculateCirclePointCords = (
	order: number,
	circleElement: HTMLElement | null,
	elementsCount: number
): Point | null => {
	if (circleElement != null) {
		const circleDiameter = circleElement.offsetHeight;
		const angle = (360 / elementsCount) * (order + ANGLE_SIDE_EFFECT);
		const x = Math.round(circleDiameter / 2 + (circleDiameter / 2) * -Math.cos((angle * Math.PI) / 180));
		const y = Math.round(circleDiameter / 2 + (circleDiameter / 2) * Math.sin((angle * Math.PI) / 180));
		return { x, y };
	}
	return null;
};
