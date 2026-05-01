import { useCallback, useEffect } from 'react';

interface KeyboardNavOptions {
  homeKey?: string;
  endKey?: string;
  leftKey?: string;
  rightKey?: string;
  upKey?: string;
  downKey?: string;
  onHome?: () => void;
  onEnd?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

export function useKeyboardNav(options: KeyboardNavOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const {
        homeKey = 'Home',
        endKey = 'End',
        leftKey = 'ArrowLeft',
        rightKey = 'ArrowRight',
        upKey = 'ArrowUp',
        downKey = 'ArrowDown',
        onHome,
        onEnd,
        onLeft,
        onRight,
        onUp,
        onDown,
      } = options;

      // Ignore if user is typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case homeKey:
          event.preventDefault();
          onHome?.();
          break;
        case endKey:
          event.preventDefault();
          onEnd?.();
          break;
        case leftKey:
          event.preventDefault();
          onLeft?.();
          break;
        case rightKey:
          event.preventDefault();
          onRight?.();
          break;
        case upKey:
          event.preventDefault();
          onUp?.();
          break;
        case downKey:
          event.preventDefault();
          onDown?.();
          break;
        case 'Tab':
          // Allow default Tab behavior
          break;
      }
    },
    [options]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
