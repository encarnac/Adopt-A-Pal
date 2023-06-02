import React, { useEffect, useState } from "react";

// source: https://czaplinski.io/blog/super-easy-animation-with-react-hooks/
const FadeAnimation = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{ animation: `${show ? "fadeIn .7s" : "fadeOut 200ms"}` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default FadeAnimation;
