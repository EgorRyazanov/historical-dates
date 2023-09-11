import { Period } from './period';

export interface HistoricalDate {
	id: number;
	title: string;
	period: Period;
	events: EventPeriod[];
}

export interface DateCircleItem {
	id: number;
	title: string;
}

export interface EventPeriod {
	year: number;
	description: string;
}
