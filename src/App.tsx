import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootRouter } from './routers/RootRouter';

export const App: FC = () => (
	<BrowserRouter>
		<RootRouter />
	</BrowserRouter>
);
