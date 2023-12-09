import { UseScrollThumb } from './hook/useScrollThumb';
import PropTypes from 'prop-types';

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
 * ScrollThumb component for displaying a scroll thumb without the scrollbar;
 * hides when idle and reappears on scroll.
 *
 * @returns {ScrollThumbProps} - The properties of the ScrollThumb component.
 */
const useScrollThumb = () => {
	const { scrollPercentage, isShowThumb, thumbElementRef } = UseScrollThumb ();
	return {
		scrollPercentage,
		isShowThumb,
		thumbElementRef
	};
};

/**
 * @param {ScrollThumbProps} props - The properties of the ScrollThumb component.
 * @returns {Component} - The rendered ScrollThumb component.
 */
const ScrollThumb = (props) => {
	const {
		color,
		width,
		height,
		position,
		zIndex,
		borderRadius
	} = props;

	const { scrollPercentage, isShowThumb, thumbElementRef } = useScrollThumb ();

	const thumbStyle = {
		top: `${scrollPercentage}%`,
		opacity: isShowThumb ? 1 : 0,
		width: width || 6,
		height: height || 64,
		backgroundColor: color || 'rgb (37, 99, 235)',
		right: position === 'right' ? '1' : 'auto',
		left: position === 'left' ? '1' : 'auto',
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
