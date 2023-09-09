import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { Period } from '../../../../utils/models/period';
import { usePreviousValue } from '../../../../hooks/usePreviousValue';
import { DEFAULT_ANIMATION_TIME, DEFAULT_NUMBERS_ANIMATION_SPREAD } from '../../../../utils/consts';
import { changeNumbersAnimation } from '../../../../utils/animations/changeNumbersAnimation';
import styles from './DatesPeriod.module.scss';

interface DatesPeriodComponentProps {
	period: Period;
}

const DatesPeriodComponent: FC<DatesPeriodComponentProps> = ({ period }) => {
	const previosPeriod = usePreviousValue(period);
	const [startDateNode, setStartDateNode] = useState<HTMLSpanElement | null>(null);
	const [endDateNode, setEndDateNode] = useState<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (startDateNode != null && endDateNode != null) {
			changeNumbersAnimation(
				startDateNode,
				previosPeriod?.start,
				DEFAULT_NUMBERS_ANIMATION_SPREAD,
				DEFAULT_ANIMATION_TIME
			);
			changeNumbersAnimation(endDateNode, previosPeriod?.end, DEFAULT_NUMBERS_ANIMATION_SPREAD, DEFAULT_ANIMATION_TIME);
		}
	}, [period, startDateNode, endDateNode]);

	return (
		<>
			<span ref={setStartDateNode} className={clsx(styles.date, styles['date_start'])}>
				{period.start}
			</span>
			<span ref={setEndDateNode} className={clsx(styles.date, styles['date_end'])}>
				{period.end}
			</span>
		</>
	);
};

export const DatesPeriod = typedMemo(DatesPeriodComponent);
