# Scroll Thumb

## Overview

`ScrollThumb` is an easy-to-use React component that allows you to display a scroll thumb without the scrollbar. The thumb automatically hides when idle and reappears on scroll, providing a sleek and unobtrusive user interface for tracking scroll progress. It Also works well with gsap's ScrollSmoother.

Autocomplete, guides on hover and type definitions are available for the component.

## Installation

Install the package using npm:

```bash
npm install scrollthumb
```
Make sure react and prop-types (as a devDependencies for type definitions) are properly installed and available in your project.

## Usage

Example usage with right-positioned thumb; place it between the body and the main element.

```jsx
import ScrollThumb from 'scrollthumb';


<ScrollThumb
	color={"rgba(37, 99, 235, 1)"}
	width={6}
	height={64}
	position={"right"}
	zIndex={50}
	borderRadius={8}
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
			normalizeScroll: true,
			ignoreMobileResize: true,
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
				color={"rgba(37, 99, 235, 1)"}
				width={6}
				height={64}
				position={"right"}
				zIndex={100}
				borderRadius={8}
			/>
		</>
	);
}

```

## Props

### `color` (optional)

- The background color of the thumb.
- Default: 'rgba(37, 99, 235, 1)'

### `width` (optional)

- The width of the thumb.
- Default: 6

### `height` (optional)

- The height of the thumb.
- Default: 64

### `position` (optional)

- The position of the thumb, either 'left' or 'right'.
- Default: 'left'

### `zIndex` (optional)

- The z-index of the thumb.
- Default: 50

### `borderRadius` (optional)

- The border radius of the thumb.
- Default: 0


## License

This package is licensed under the ISC License.
