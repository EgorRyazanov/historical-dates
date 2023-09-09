import { FC } from 'react';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { Period } from '../../../../utils/models/period';
import styles from './DatesPeriod.module.scss';

interface DatesPeriodComponentProps {
	period: Period;
}

const DatesPeriodComponent: FC<DatesPeriodComponentProps> = ({ period }) => {
	return (
		<>
			<span className={clsx(styles.date, styles['date_start'])}>{period.start}</span>
			<span className={clsx(styles.date, styles['date_end'])}>{period.end}</span>
		</>
	);
};

export const DatesPeriod = typedMemo(DatesPeriodComponent);
