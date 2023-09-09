import { FC } from 'react';
import { v4 as generateId } from 'uuid';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { DatesCircle } from '../../components/DatesCircle';
import styles from './HistoricalDatesPage.module.scss';

const HistoricalDatesPageComponent: FC = () => {
	return (
		<div className={styles['dates-container']}>
			<div className={styles['dates__title-container']}>
				<h1 className={styles['dates-title']}>Исторические даты</h1>
			</div>
			<div className={styles['dates__circle-container']}>
				<DatesCircle id={generateId()} pointSize={{ inactiveSize: 6, activeSize: 56 }} />
				<div className={clsx(styles['dates-markup'], styles['dates-markup_horizontal'])} />
			</div>
			<div className={clsx(styles['dates-markup'], styles['dates-markup_vertical'])} />
		</div>
	);
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
