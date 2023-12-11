import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @typedef {Object} ScrollThumbProps
 * @property {string} [color] - The background color of the thumb.
 * @property {number} [width] - The width of the thumb.
 * @property {number} [height] - The height of the thumb.
 * @property {('left'|'right')} [position] - The position of the thumb, either 'left' or 'right'.
 * @property {number} [zIndex] - The z-index of the thumb.
 * @property {number} [borderRadius] - The border radius of the thumb.
 */

/**
 * ScrollThumb component for displaying a scroll thumb without the scrollbar; hides when idle and reappears on scroll.
 *
 * @component
 * @example
 * // Example usage with right-positioned thumb
 * <ScrollThumb
 *   color={"rgba(37, 99, 235, 1)"}
 *   width={6}
 *   height={64}
 *   position={"right"}
 *   zIndex={50}
 *   borderRadius={8}
 * />
 *
 * @param {ScrollThumbProps} props - The properties of the ScrollThumb component.
 * @returns {Object} - The rendered ScrollThumb component.
 */
const ScrollThumb = ({ color, width, height, position, zIndex, borderRadius }) => {
	const { scrollPercentage, isShowThumb, thumbElementRef } = useScrollThumb ();


	const thumbStyle = {
		top: `${scrollPercentage}%`,
		opacity: isShowThumb ? 1 : 0,
		width: width || 6,
		height: height || 64,
		backgroundColor: color || 'rgba(37, 99, 235, 1)',
		right: position === 'right' ? 1 : 'auto',
		left: position === 'left' ? 1 : 'auto',
		zIndex: zIndex || 50,
		borderRadius: borderRadius || 0
	};

	return (
		<div
			style={thumbStyle}
			ref={thumbElementRef}
			className={`fixed rounded-lg transition-opacity ease-in-out ${
				position === 'right' ? 'right-1' : 'left-1'
			}`}
		/>
	);
};


ScrollThumb.propTypes = {
	/**
	 * The color of the thumb.
	 * @type {string}
	 */
	color: PropTypes.string,
	/**
	 * The width of the thumb.
	 * @type {number}
	 */
	width: PropTypes.number,
	/**
	 * The height of the thumb.
	 * @type {number}
	 */
	height: PropTypes.number,
	/**
	 * The position of the thumb, either 'left' or 'right'.
	 * @type {string}
	 */
	position: PropTypes.oneOf (['left', 'right']),
	/**
	 * The z-index of the thumb.
	 * @type {number}
	 */
	zIndex: PropTypes.number,
	/**
	 * The border radius of the thumb.
	 * @type {number}
	 */
	borderRadius: PropTypes.number
};

export default ScrollThumb;

function useScrollThumb () {
	let hideTimeout = 3000;
	const [scrollPercentage, setScrollPercentage] = useState (0);
	const [isShowThumb, setIsShowThumb] = useState (false);
	const thumbElementRef = useRef (null);
	const hideTimeoutRef = useRef (null);

	const calculateScrollPercentage = useCallback (() => {
		const { scrollTop } = document.documentElement;

		if (! window.innerHeight) {
			return 0;
		}

		const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
		const offset = maxScrollTop !== 0 ? (100 * thumbElementRef.current.clientHeight) / window.innerHeight : 0;
		const percentage = (scrollTop / maxScrollTop) * (100 - offset);

		return Math.min (percentage, 100);
	}, []);

	const updateThumbPosition = useCallback (() => {
		const percentage = calculateScrollPercentage ();
		setScrollPercentage (percentage);
		setIsShowThumb (true);

		if (hideTimeoutRef.current) {
			clearTimeout (hideTimeoutRef.current);
		}

		hideTimeoutRef.current = setTimeout (() => {
			setIsShowThumb (false);
		}, hideTimeout);
	}, [calculateScrollPercentage, hideTimeout]);

	useEffect (() => {
		const handleScroll = () => {
			requestAnimationFrame (updateThumbPosition);

			if (hideTimeoutRef.current) {
				clearTimeout (hideTimeoutRef.current);
			}
		};

		const handleResize = () => {
			updateThumbPosition ();
		};

		window.addEventListener ('scroll', handleScroll);
		window.addEventListener ('resize', handleResize);

		return () => {
			clearTimeout (hideTimeoutRef.current);
			window.removeEventListener ('scroll', handleScroll);
			window.removeEventListener ('resize', handleResize);
		};
	}, [updateThumbPosition]);

	useEffect (() => {
		if (isShowThumb) {
			const translateY = `calc(${scrollPercentage}% - ${thumbElementRef.current?.clientHeight ?? 0}px)`;
			thumbElementRef.current.style.transform = `matrix(1, 0, 0, 1, 0, ${translateY})`;
		} else {
			thumbElementRef.current.style.transform = 'none';
		}
	}, [scrollPercentage, isShowThumb]);

	return {
		scrollPercentage,
		isShowThumb,
		thumbElementRef
	};
}









