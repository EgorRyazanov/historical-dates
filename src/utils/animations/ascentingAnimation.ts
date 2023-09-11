import gsap, { Cubic } from 'gsap';

export const ascentAnimation = (
	element: HTMLElement | string,
	fromOpacity: number,
	toOpacity: number,
	fromY: number,
	toY: number,
	duration: number,
	delay?: number
) => {
	const targetElement = typeof element === 'string' ? `.${element}` : element;
	gsap.fromTo(
		targetElement,
		{ y: fromY, opacity: fromOpacity },
		{ y: toY, opacity: toOpacity, ease: Cubic.easeOut, delay, duration }
	);
};
