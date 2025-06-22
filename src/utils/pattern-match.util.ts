type Pattern<T, R> = [T[], (value: any[]) => R];

export const match =
  <T, R>(value: T, ...patterns: Pattern<T, R>[]) =>
  (...args: any[]): R | null => {
    for (const [patternValues, fn] of patterns) {
      if (patternValues.includes(value)) {
        return fn(args);
      }
    }
    return null;
  };
