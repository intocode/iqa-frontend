import { useEffect } from 'react';

export const useOnScroll = (scrollHandler) => {
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);
};
