import { FC, useState } from 'react';
import { v4 as generateId } from 'uuid';
import clsx from 'clsx';

import { typedMemo } from '../../../../utils/typedMemo';
import { DatesCircle } from '../../components/DatesCircle';
import { DatesPeriod } from '../../components/DatesPeriod/DatesPeriod';
import { Period } from '../../../../utils/models/period';
import styles from './HistoricalDatesPage.module.scss';

export interface Info {
	id: number;
	title: string;
	period: Period;
}

export interface DateCircleItem {
	id: number;
	title: string;
}

const data: Info[] = [
	{ title: 'dads', id: 1, period: { start: 2003, end: 2099 } },
	{ title: 'dsdsds', id: 2, period: { start: 2011, end: 2102 } },
	{ title: '1231', id: 3, period: { start: 2014, end: 2312 } },
	{ title: 'fsf', id: 4, period: { start: 2002, end: 2001 } },
	{ title: 'rwrw', id: 5, period: { start: 1999, end: 2002 } },
	{ title: 'dasfaf', id: 6, period: { start: 2024, end: 2000 } },
];

const HistoricalDatesPageComponent: FC = () => {
	const [activeItemId, setActiveItemId] = useState<Info['id']>(data[0].id);

	return (
		<div className={styles['dates-container']}>
			<div className={styles['dates__title-container']}>
				<h1 className={styles['dates-title']}>Исторические даты</h1>
			</div>
			<div className={styles['dates__circle-container']}>
				<DatesCircle
					id={generateId()}
					activeItemId={activeItemId}
					setActiveItemId={setActiveItemId}
					pointSize={{ inactiveSize: 6, activeSize: 56 }}
					info={data.map((dateItem) => {
						return { id: dateItem.id, title: dateItem.title };
					})}
				/>
				<div className={clsx(styles['dates-markup'], styles['dates-markup_horizontal'])} />
			</div>
			<div className={styles['dates__period']}>
				<DatesPeriod period={data.find((item) => item.id === activeItemId)!.period} />
			</div>
			<button>booom</button>
			<div className={clsx(styles['dates-markup'], styles['dates-markup_vertical'])} />
		</div>
	);
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
