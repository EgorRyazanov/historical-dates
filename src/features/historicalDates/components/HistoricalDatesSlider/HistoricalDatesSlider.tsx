import { FC, useEffect, useState } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { DefaultArrowButton } from '../../../../components/DefaultArrowButton';
import { ButtonRotataion } from '../../../../utils/buttonRotation';
import styles from './HistoricalDatesSlider.module.scss';
import { Info } from '../../pages/HistoricalDatesPage/HistoricalDatesPage';
import { DEFAULT_ANIMATION_TIME } from '../../../../utils/consts';
import { setNumberPrefix } from '../../../../utils/setNumberPrefix';

enum ButtonEventValue {
	Previos = -1,
	Next = 1,
}

interface HistoricalDatesSliderComponentProps {
	info: Info[];
	setActiveItemId: (id: Info['id']) => void;
	activeItemId: number;
}

const HistoricalDatesSliderComponent: FC<HistoricalDatesSliderComponentProps> = ({
	info,
	setActiveItemId,
	activeItemId,
}) => {
	const [order, setOrder] = useState(0);
	const [isButtonsDisabled, setButtonsDisabled] = useState(false);

	const calculateOrder = (): number => {
		const item = info.find((item) => item.id === activeItemId);
		if (item != null) {
			return info.indexOf(item) + 1;
		}
		return 0;
	};

	const handleClick = (value: ButtonEventValue) => {
		const nextItemIndex = order + value - 1;
		setActiveItemId(info[nextItemIndex].id);
	};

	useEffect(() => {
		setButtonsDisabled(true);
		setOrder(calculateOrder());
		setTimeout(() => {
			setButtonsDisabled(false);
		}, DEFAULT_ANIMATION_TIME * 1000);
	}, [activeItemId]);

	return (
		<div>
			<span className={styles.order}>
				{setNumberPrefix(order)}/{setNumberPrefix(info.length)}
			</span>
			<div className={styles['buttons-container']}>
				<DefaultArrowButton
					onClick={() => handleClick(ButtonEventValue.Previos)}
					isDisabled={order === 1 || isButtonsDisabled}
					rotation={ButtonRotataion.Left}
				/>
				<DefaultArrowButton
					onClick={() => handleClick(ButtonEventValue.Next)}
					isDisabled={order === info.length || isButtonsDisabled}
					rotation={ButtonRotataion.Right}
				/>
			</div>
		</div>
	);
};

export const HistoricalDatesSlider = typedMemo(HistoricalDatesSliderComponent);
