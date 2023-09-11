import { FC, useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { DatesCircle } from '../../components/DatesCircle';
import { DatesPeriod } from '../../components/DatesPeriod/DatesPeriod';
import { HistoricalDatesSlider } from '../../components/HistoricalDatesSlider';
import { HistoricalDate } from '../../../../utils/models/historicalDate';
import styles from './HistoricalDates.module.scss';

interface HistoricalDatesComponentProps {
	title: string;
	historicalDate: HistoricalDate[];
}

const HistoricalDatesComponent: FC<HistoricalDatesComponentProps> = ({ historicalDate, title }) => {
	const [activeItemId, setActiveItemId] = useState<HistoricalDate['id'] | null>();

	useEffect(() => {
		if (historicalDate.length > 0) {
			setActiveItemId(historicalDate[0]?.id);
		}
	}, []);

	return (
		activeItemId != null && (
			<div className={styles['dates-container']}>
				<div className={styles['dates__title-container']}>
					<h1 className={styles['dates-title']}>{title}</h1>
				</div>
				<div className={styles['dates__circle-container']}>
					<DatesCircle
						id={generateId()}
						activeItemId={activeItemId}
						setActiveItemId={setActiveItemId}
						pointSize={{ inactiveSize: 6, activeSize: 56 }}
						info={historicalDate.map((dateItem) => {
							return { id: dateItem.id, title: dateItem.title };
						})}
					/>
					<div className={clsx(styles['dates-markup'], styles['dates-markup_horizontal'])} />
				</div>
				<div className={styles['dates__period']}>
					<DatesPeriod period={historicalDate.find((item) => item.id === activeItemId)!.period} />
				</div>
				<div className={clsx(styles['dates-markup'], styles['dates-markup_vertical'])} />
				<HistoricalDatesSlider setActiveItemId={setActiveItemId} activeItemId={activeItemId} info={historicalDate} />
			</div>
		)
	);
};

export const HistoricalDates = typedMemo(HistoricalDatesComponent);
