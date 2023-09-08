import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { datesRoutes } from '../features/historicalDates/routes';

const routes: RouteObject[] = [...datesRoutes];

export const RootRouter: FC = () => useRoutes(routes);
