import { useCallback, useEffect, useRef, useState } from 'react';

export function UseScrollThumb () {
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
