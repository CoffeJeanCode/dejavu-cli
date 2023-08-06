type Pattern<T, R> = [T, (value: any[]) => R];

export const match =
  <T, R>(value: T, ...patterns: Pattern<T, R>[]) =>
  (...args: any[]): R | null => {
    for (const [patternValue, fn] of patterns) {
      if (value === patternValue) {
        return fn(args);
      }
    }
    return null;
  };
