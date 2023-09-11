import gsap, { Cubic } from 'gsap';

export const rotate = (element: HTMLElement | string, angle: number, duration?: number) => {
	const targetElement = typeof element === 'string' ? `.${element}` : element;
	gsap.to(targetElement, {
		rotation: angle,
		ease: Cubic.easeInOut,
		duration,
	});
};
