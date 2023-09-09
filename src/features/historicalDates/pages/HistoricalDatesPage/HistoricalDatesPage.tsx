import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import styles from './HistoricalDatesPage.module.scss';
import { DatesCircle } from '../../components/DatesCircle';

const HistoricalDatesPageComponent: FC = () => {
	return (
		<div className={styles['dates-container']}>
			<DatesCircle pointSize={{ inactiveSize: 6, activeSize: 56 }} />
		</div>
	);
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
