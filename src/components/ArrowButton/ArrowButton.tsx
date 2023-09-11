import { FC } from 'react';
import { typedMemo } from '../../utils/typedMemo';

interface ImageButtonComponentProps {
	isDisabled: boolean;
	containerClassName: string;
	imageWidth: number;
	imageHeight: number;
	imageColor: string;
	onClick?: (args: unknown) => void;
}

const ImageButtonComponent: FC<ImageButtonComponentProps> = ({
	isDisabled,
	containerClassName,
	imageHeight,
	imageColor,
	imageWidth,
	onClick,
}) => {
	return (
		<button className={containerClassName} onClick={onClick} disabled={isDisabled}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={imageWidth}
				height={imageHeight}
				viewBox={`0 0 ${imageWidth} ${imageHeight}`}
				fill="none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width={imageWidth} height={imageHeight} viewBox="0 0 8 12" fill="none">
					<path d="M1 1L6 6L1 11" stroke={imageColor} strokeWidth="2" />
				</svg>
			</svg>
		</button>
	);
};

export const ImageButton = typedMemo(ImageButtonComponent);
