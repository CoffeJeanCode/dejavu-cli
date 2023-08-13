export enum TypeComponent {
  file = "file",
  barrel = "barrel",
}

export enum Language {
  javascript = "javascript",
  typescript = "typescript",
}

export enum Extension {
  js = "js",
  tsx = "tsx",
}

export interface ConfigFile {
  language: Language;
  mainFolder: string;
  typeComponent: TypeComponent;
}

export interface Config extends ConfigFile {
  extension: Extension;
}
