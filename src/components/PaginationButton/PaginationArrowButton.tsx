import { FC } from 'react';
import clsx from 'clsx';

import { ImageButton } from '../ArrowButton';
import { typedMemo } from '../../utils/typedMemo';
import { ButtonRotataion } from '../../utils/buttonRotation';
import styles from './PaginationArrowButton.module.scss';

interface PaginationArrowButtonComponentProps {
	onClick: () => void;
	rotation: ButtonRotataion;
	isDisabled: boolean;
}

const PaginationArrowButtonComponent: FC<PaginationArrowButtonComponentProps> = ({ onClick, rotation, isDisabled }) => {
	return (
		<ImageButton
			containerClassName={clsx(styles.button, {
				[styles['button_left']]: rotation == ButtonRotataion.Left,
			})}
			imageWidth={8}
			imageHeight={12}
			imageColor="#3877EE"
			onClick={onClick}
			isDisabled={isDisabled}
		/>
	);
};

export const PaginationArrowButton = typedMemo(PaginationArrowButtonComponent);
