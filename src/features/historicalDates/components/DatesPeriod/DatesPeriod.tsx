import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { Period } from '../../../../utils/models/period';
import { usePreviousValue } from '../../../../hooks/usePreviousValue';
import { getUpdatedPeriodPart } from '../../../../utils/getUpdatedPeriod';
import styles from './DatesPeriod.module.scss';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';

interface DatesPeriodComponentProps {
	period: Period;
}

const DatesPeriodComponent: FC<DatesPeriodComponentProps> = ({ period }) => {
	const prevPeriod = usePreviousValue(period);
	const [currentPeriod, setCurrentPeriod] = useState<Period>(prevPeriod ?? period);
	const [animationTime, setAnimationTime] = useState(0);

	useEffect(() => {
		setAnimationTime(
			Math.max(
				Math.abs(period.start - (prevPeriod?.start ?? period.start)),
				Math.abs(period.end - (prevPeriod?.end ?? period.end))
			)
		);
	}, [period]);

	useEffect(() => {
		console.log(animationTime);
		if (currentPeriod.start !== period.start || currentPeriod.end !== period.end)
			setTimeout(
				() => {
					setCurrentPeriod({
						start: getUpdatedPeriodPart(currentPeriod.start, period.start),
						end: getUpdatedPeriodPart(currentPeriod.end, period.end),
					});
				},
				(DEFAULT_ANIMATION_TIME * 1000) / animationTime
			);
	}, [currentPeriod, period]);

	return (
		<>
			<span className={clsx(styles.date, styles['date_start'])}>{currentPeriod.start}</span>
			<span className={clsx(styles.date, styles['date_end'])}>{currentPeriod.end}</span>
		</>
	);
};

export const DatesPeriod = typedMemo(DatesPeriodComponent);
