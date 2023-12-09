import { UseScrollThumb } from '@/hook/useScrollThumb.jsx';
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
	const { scrollPercentage, isShowThumb, thumbElementRef } = UseScrollThumb ();


	const thumbStyle = {
		top: `${scrollPercentage}%`,
		opacity: isShowThumb ? 1 : 0,
		width: width || 6,
		height: height || 64,
		backgroundColor: color || 'rgba (37, 99, 235, 1)',
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

export default ScrollThumb;

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
