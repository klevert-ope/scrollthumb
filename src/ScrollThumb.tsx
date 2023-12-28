/**
 * @file
 * ScrollThumb component designed to display a scroll thumb independently of the scrollbar.
 * The thumb hides when idle and reappears upon scrolling.
 * @copyright (c) 2023 Klevert Opee
 * @license ISC
 */
import React, { useCallback, useEffect, useRef, useState } from "react";

type ScrollThumbProps ={
	/**
	 * The background color of the thumb.
	 * Default is 'rgb (37, 99, 235)'.
	 */
	color?: string;
	/**
	 * The width of the thumb.
	 * Default is 6 px.
	 */
	width?: number;
	/**
	 * The height of the thumb.
	 * Default is 64 px.
	 */
	height?: number;
	/**
	 * The position of the thumb, either 'left' or 'right'.
	 */
	position?: 'left' | 'right';
	/**
	 * The z-index of the thumb.
	 * Default is 50.
	 */
	zIndex?: number;
	/**
	 * The border radius of the thumb.
	 * Default is 2px.
	 */
	borderRadius?: number;
	/**
	 * The timeout duration for hiding the thumb in seconds.
	 * If you wish to deactivate the hide time, use {'9999999'}.
	 * The default duration is set to 2 seconds.
	 */
	hidetime?: number;
};

/**
 * ScrollThumb component designed to display a scroll thumb independently of the scrollbar.
 * The thumb hides when idle and reappears upon scrolling.
 * @component
 * @example
 * <ScrollThumb
 * color={'rgba(37, 99, 235, 1)'}
 * width={'6px'}
 * height={'64px'}
 * position={'right'}
 * zIndex={'100'}
 * borderRadius={'8px'}
 * hidetime={'3'}
 * />
 * @param {ScrollThumbProps} props - Properties specific to the ScrollThumb component.
 * @returns {ScrollThumbProps} - The properties of the ScrollThumb component.
 */

const ScrollThumb: (props: ScrollThumbProps) => React.JSX.Element = (props: ScrollThumbProps): React.JSX.Element => {
	const {
		color,
		width,
		height,
		position,
		zIndex,
		borderRadius,
		hidetime
	} = props;

	const { scrollPercentage, isShowThumb, thumbElementRef } = useScrollThumb({
		Timeout: hidetime
	});

	const thumbStyle: React.CSSProperties = {
		position: 'fixed',
		top: `${scrollPercentage}%`,
		width: width || '6px',
		height: height || '64px',
		backgroundColor: color || 'rgb(37, 99, 235)',
		zIndex: zIndex || '50',
		borderRadius: borderRadius || '2px',
		transition: 'opacity 0.3s ease-in-out'
	};

	if (isShowThumb) {
		thumbStyle.opacity = '1';
	} else {
		thumbStyle.opacity = '0';
	}

	if (position === 'right') {
		thumbStyle.right = '3px';
		thumbStyle.left = 'auto';
	} else if (position === 'left') {
		thumbStyle.left = '3px';
		thumbStyle.right = 'auto';
	}else {
		return null;
	}


	return (
		<div style={thumbStyle} ref={thumbElementRef}></div>
	);
};

export default ScrollThumb;

type useScrollThumbProps = {
	Timeout: number ;
};

function useScrollThumb({ Timeout }: useScrollThumbProps) {
	const hideTimeout = (Timeout || 2) * 1000;
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const [isShowThumb, setIsShowThumb] = useState(false);
	const thumbElementRef = useRef<HTMLDivElement>(null);
	const hideTimeoutRef = useRef<number | null>(null);

	const calculateScrollPercentage = useCallback(() => {
		const { scrollTop } = document.documentElement;

		if (!window.innerHeight || typeof window.innerHeight !== 'number' || window.innerHeight <= 0) {
			return 0;
		}

		const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

		let offset = 0;
		if (maxScrollTop !== 0) {
			if (thumbElementRef?.current) {
				offset = (100 * thumbElementRef.current.clientHeight) / window.innerHeight;
			}
		}

		const percentage = (scrollTop / maxScrollTop) * (100 - offset);

		return Math.min(percentage, 100);
	}, [thumbElementRef]);

	const updateThumbPosition = useCallback(() => {
		setScrollPercentage(calculateScrollPercentage());
		setIsShowThumb(true);

		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
		}

		hideTimeoutRef.current = setTimeout(() => {
			setIsShowThumb(false);
		}, hideTimeout)as undefined;
	}, [calculateScrollPercentage, hideTimeout]);

	useEffect(() => {
		const handleScroll = () => {
			requestAnimationFrame(updateThumbPosition);

			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current);
			}
		};

		const handleResize = () => {
			updateThumbPosition();
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			clearTimeout(hideTimeoutRef.current);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, [updateThumbPosition]);

	useEffect(() => {
		if (isShowThumb) {
			const translateY = `calc(${scrollPercentage}% - ${thumbElementRef.current?.clientHeight ?? 0}px)`;

			if (thumbElementRef.current) {
				thumbElementRef.current.style.transform = `matrix(1, 0, 0, 1, 0, ${translateY})`;
			}
		} else {
			thumbElementRef.current.style.transform = "none";
		}
	}, [scrollPercentage, isShowThumb]);

	return {
		scrollPercentage,
		isShowThumb,
		thumbElementRef
	};
}
