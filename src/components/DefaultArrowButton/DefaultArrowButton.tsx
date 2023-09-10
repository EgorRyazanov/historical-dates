import { FC } from 'react';
import clsx from 'clsx';

import { ImageButton } from '../ArrowButton';
import { typedMemo } from '../../utils/typedMemo';
import { ButtonRotataion } from '../../utils/buttonRotation';
import styles from './DefaultArrowButton.module.scss';

interface DefaultArrowButtonComponentProps {
	isDisabled: boolean;
	onClick: () => void;
	rotation: ButtonRotataion;
}

const DefaultArrowButtonComponent: FC<DefaultArrowButtonComponentProps> = ({ isDisabled, onClick, rotation }) => {
	return (
		<ImageButton
			containerClassName={clsx(styles.button, {
				[styles['button_left']]: rotation == ButtonRotataion.Left,
				[styles['button_disabled']]: isDisabled,
			})}
			imageWidth={10}
			imageHeight={14}
			imageColor="#42567A"
			onClick={onClick}
		/>
	);
};

export const DefaultArrowButton = typedMemo(DefaultArrowButtonComponent);
