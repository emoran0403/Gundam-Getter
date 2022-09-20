export interface ModelKit {
  scrapable: boolean;
  rawSKU: string;
  prefix: string;
  SKU: number;
}

export interface ModelKitResult extends ModelKit {
  releaseDate: string;
  scrapedDate: string;
}

export interface ScraperList {
  gcz: Function;
  koto: Function;
}
