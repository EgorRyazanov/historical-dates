import gsap, { Cubic } from 'gsap';

export const changeOpacity = (element: HTMLElement | string, opacity: number, duration: number, delay?: number) => {
	const targetElement = typeof element === 'string' ? `.${element}` : element;
	gsap.to(targetElement, {
		ease: Cubic.easeInOut,
		opacity,
		duration,
		delay,
		repeat: 0,
	});
};
