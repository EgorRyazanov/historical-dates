import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { HistoricalDates } from '../../components/HistoricalDates';
import { historicalDate } from '../../../../utils/mock';

const HistoricalDatesPageComponent: FC = () => {
	return <HistoricalDates title={'Исторические даты'} historicalDate={historicalDate} />;
};

export const HistoricalDatesPage = typedMemo(HistoricalDatesPageComponent);
