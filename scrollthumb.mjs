import React, { useState, useRef, useCallback, useEffect } from 'react';

const ScrollThumb = (props) => {
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
  const thumbStyle = {
    position: "fixed",
    top: `${scrollPercentage}%`,
    width: width || "6px",
    height: height || "64px",
    backgroundColor: color || "rgb(37, 99, 235)",
    zIndex: zIndex || "50",
    borderRadius: borderRadius || "2px",
    transition: "opacity 0.3s ease-in-out"
  };
  if (isShowThumb) {
    thumbStyle.opacity = "1";
  } else {
    thumbStyle.opacity = "0";
  }
  if (position === "right") {
    thumbStyle.right = "3px";
    thumbStyle.left = "auto";
  } else if (position === "left") {
    thumbStyle.left = "3px";
    thumbStyle.right = "auto";
  } else {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", { style: thumbStyle, ref: thumbElementRef });
};
function useScrollThumb({ Timeout }) {
  const hideTimeout = (Timeout || 2) * 1e3;
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isShowThumb, setIsShowThumb] = useState(false);
  const thumbElementRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const calculateScrollPercentage = useCallback(() => {
    const { scrollTop } = document.documentElement;
    if (!window.innerHeight || typeof window.innerHeight !== "number" || window.innerHeight <= 0) {
      return 0;
    }
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    let offset = 0;
    if (maxScrollTop !== 0) {
      if (thumbElementRef && thumbElementRef.current) {
        offset = 100 * thumbElementRef.current.clientHeight / window.innerHeight;
      }
    }
    const percentage = scrollTop / maxScrollTop * (100 - offset);
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
    }, hideTimeout);
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
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(hideTimeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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

export { ScrollThumb as default };
//# sourceMappingURL=scrollthumb.mjs.map
