import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * Perform an action when the user clicks outside of received elements.
 * @param refs The list of RefObject for each element that will NOT trigger the action.
 * @param action The action to be triggered on click outside of any of the given refs.
 */
export function useActionOnClickOutside(
  refs: RefObject<HTMLDivElement | null>[],
  action: () => void,
) {
  useEffect(() => {
    const onClickListener = (e: MouseEvent) => {
      const target = e.target;
      if (
        targetIsNode(target) &&
        !refs.some((ref) => ref.current?.contains(target))
      ) {
        action();
      }
    };

    document.addEventListener('pointerdown', onClickListener);
    return () => document.removeEventListener('pointerdown', onClickListener);
  }, [action, refs]);
}

function targetIsNode(e: EventTarget | null): e is Node {
  if (!e || !('nodeType' in e)) {
    return false;
  }
  return true;
}
