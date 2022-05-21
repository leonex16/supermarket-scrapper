import { useEffect, useState } from 'react';

interface useObservableProps {
  elementRef: React.RefObject<Element>,
  once?: boolean,
  options?: IntersectionObserverInit
}
export const useObservable = ( { elementRef, once = true, options = undefined }: useObservableProps ) => {
  const [ isIntersecting, setIsIntersecting ] = useState( false );

  useEffect( () => {
    if ( elementRef.current === null ) return undefined;

    const callback: IntersectionObserverCallback = entries => {
      const [ entry ] = entries;
      setIsIntersecting( entry.isIntersecting );
    };
    const observer = new IntersectionObserver( callback, options ?? { rootMargin: '100px' } );

    observer.observe( elementRef.current );

    ( once && isIntersecting )
      ? observer.disconnect()
      : setIsIntersecting( false );

    return () => {
      observer.disconnect();
    };
  }, [ elementRef, isIntersecting, setIsIntersecting, once, options ] );

  return { isIntersecting };
};
