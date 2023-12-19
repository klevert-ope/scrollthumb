# Scroll Thumb

## Overview

`ScrollThumb` is an easy-to-use React component that allows you to display a scroll thumb without the scrollbar. The thumb automatically hides when idle and reappears on scroll, providing a sleek and unobtrusive user interface for tracking scroll progress. It Also works well with gsap's ScrollSmoother on React frameworks.

Autocomplete, guides on hover and type definitions are available for the component.

## Installation

Install the package using:

```bash
npm install scrollthumb
```

## Usage

Example usage of thumb; place it between the body and the main element.

```jsx
import ScrollThumb from 'scrollthumb';


<ScrollThumb
	color={'rgba(37, 99, 235, 1)'}
	width={'6px'}
	height={'64px'}
	position={'right'}
	zIndex={'100'}
	borderRadius={'8px'}
	hidetime={'3'}
/>
```
## Example Gsap Usage

next.js/gsap example

```jsx
'use client';
import ScrollThumb from "scrollthumb";
import {useScrollSmoother} from "use-scrollsmoother";

export default function Home() {
	const {smoothWrapperRef, smoothContentRef} = useScrollSmoother({
		config: {
			smooth: 2,
			smoothTouch: 0.2,
			snormalizeScroll: true,
			signoreMobileResize: true,
		},
	});

	return (
		<>
			<div id="smooth-wrapper" ref={smoothWrapperRef}>
				<div id="smooth-content" ref={smoothContentRef}>
					<main>
						{/* the rest of your page content */}
					</main>
				</div>
			</div>
			<ScrollThumb
				color={'rgba(37, 99, 235, 1)'}
				width={'6px'}
				height={'64px'}
				position={'right'}
				zIndex={'100'}
				borderRadius={'8px'}
				hidetime={'3'}
                />
		</>
	);
}

```

## Props

### `color` 

- The background color of the thumb.
- Default: 'rgba(37, 99, 235, 1)'

### `width` 

- The width of the thumb.
- Default: 6px

### `height` 

- The height of the thumb.
- Default: 64px

### `position` 

- The position of the thumb, either 'left' or 'right'.
- Default: 'left'

### `zIndex` 

- The z-index of the thumb.
- Default: 50

### `borderRadius` 

- The border radius of the thumb.
- Default: 2px

### `hidetime` 

- The hide timeout for the thumb in seconds.
- Default: 2 seconds


## License

This package is licensed under the ISC License.
