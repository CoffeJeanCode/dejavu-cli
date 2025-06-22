export const normalize = (name: string) =>
  name.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "");
