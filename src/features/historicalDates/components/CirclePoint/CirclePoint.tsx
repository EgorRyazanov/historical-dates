import { FC, KeyboardEventHandler } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import styles from './CirclePoint.module.scss';

interface Props {
	item: { title: string };
	index: number;
	point: { x: number; y: number };
	setCurrentOrder: (x: number) => void;
}

const CirclePointComponent: FC<Props> = ({ item, index, point, setCurrentOrder }) => {
	// const handleKeyDown = (event: KeyboardEventHandler<HTMLDivElement>) => {
	// if (event.key) {
	//
	// }
	// };

	return (
		<button
			// tabIndex={index}
			// role="button"
			// onKeyDown={(event) => handleKeyDown(event)}
			onClick={() => setCurrentOrder(index + 1)}
			style={{ bottom: point.y - 3, left: point.x - 3 }}
			className={styles.point}
		>
			<span style={{ display: 'block' }}>{index}</span>
		</button>
	);
};

export const CirclePoint = typedMemo(CirclePointComponent);
