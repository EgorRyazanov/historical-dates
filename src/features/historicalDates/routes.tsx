import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HistoricalDatesPage = lazy(() =>
	import('./pages/HistoricalDatesPage').then((module) => ({ default: module.HistoricalDatesPage }))
);

export const datesRoutes: RouteObject[] = [
	{
		path: '*',
		element: <HistoricalDatesPage />,
	},
];
