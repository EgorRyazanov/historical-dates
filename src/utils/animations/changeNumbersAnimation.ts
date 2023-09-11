import gsap, { Cubic } from 'gsap';

export const changeNumbersAnimation = (
	element: HTMLElement | string,
	previousValue: number | undefined,
	spread: number,
	duration?: number
) => {
	const targetElement = typeof element === 'string' ? `.${element}` : element;
	gsap.from(targetElement, {
		textContent: previousValue,
		duration: duration,
		ease: Cubic.easeOut,
		snap: { textContent: spread },
	});
};
