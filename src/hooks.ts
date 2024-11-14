/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";

export function useEventCallback<T extends (...args: any[]) => any>(
  cb: T,
  deps: any[] = []
) {
  const ref = useRef(cb);

  useEffect(() => {
    ref.current = cb;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, ...deps]);

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref.current(...args),
    []
  );
}
