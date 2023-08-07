import { capitalize } from "./capitalize.util";
import { normalize } from "./normalize.util";

export const formatComponentName = (name: string) => {
  const normalized = normalize(name);
  return capitalize(normalized);
};
