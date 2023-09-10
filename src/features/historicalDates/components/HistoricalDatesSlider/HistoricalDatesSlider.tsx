import { typedMemo } from '../../../../utils/typedMemo';
import styles from './HistoricalDatesSlider.module.scss';
import { DefaultArrowButton } from '../../../../components/DefaultArrowButton';
import { ButtonRotataion } from '../../../../utils/buttonRotation';
import { PaginationArrowButton } from '../../../../components/PaginationButton';

const HistoricalDatesSliderComponent = () => {
	return (
		<div className={styles['buttons-container']}>
			<DefaultArrowButton onClick={() => {}} isDisabled={false} rotation={ButtonRotataion.Left} />
			<PaginationArrowButton onClick={() => {}} rotation={ButtonRotataion.Right} />
		</div>
	);
};

export const HistoricalDatesSlider = typedMemo(HistoricalDatesSliderComponent);
