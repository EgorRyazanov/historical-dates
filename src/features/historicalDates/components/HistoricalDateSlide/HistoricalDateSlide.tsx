import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import styles from './HistoricalDateSlide.module.scss';

interface HistoricalDateSlideComponentProps {
	year: number;
	description: string;
}

const HistoricalDateSlideComponent: FC<HistoricalDateSlideComponentProps> = ({ year, description }) => {
	return (
		<div className={styles['slide-container']}>
			<h4 className={styles['slide-title']}>{year}</h4>
			<span>{description}</span>
		</div>
	);
};

export const HistoricalDateSlide = typedMemo(HistoricalDateSlideComponent);
