export enum TypeComponent {
  file = "file",
  barrel = "barrel",
}

export enum Language {
  JavaScript = 'javascript',
  TypeScript = 'typescript',
}

export const ExtensionMap = {
  [Language.JavaScript]: 'js',
  [Language.TypeScript]: 'tsx',
} as const;

export type ExtensionMap = typeof ExtensionMap;
export type Extension = ExtensionMap[Language];

export type ConfigFile<L extends Language = Language> = {
  language: L;
  mainFolder: string;
  typeComponent: TypeComponent;
};

export type Config<L extends Language = Language> = ConfigFile<L> & {
  extension: ExtensionMap[L];
};