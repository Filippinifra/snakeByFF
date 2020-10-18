import React, { useRef, useEffect } from "react";

export const useInterval = (callback, INITIAL_DELAY) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, INITIAL_DELAY);
    return () => clearInterval(id);
  }, [INITIAL_DELAY]);
};
