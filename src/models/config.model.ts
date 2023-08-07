export enum TypeComponent {
  file = "file",
  barrel = "barrel",
}

export enum Language {
  javascript = "js",
  typescript = "ts",
}

export interface Config {
  language: Language;
  mainFolder: string;
  typeComponent: TypeComponent;
}
