type ScrollThumbProps = {
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
    position: 'left' | 'right';
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
declare const ScrollThumb: (props: ScrollThumbProps) => JSX.Element;

export { ScrollThumb as default };
