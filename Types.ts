export interface ModelKit {
  scrapable: boolean;
  rawSKU: string;
  prefix: string;
  SKU: number;
}

export interface ModelKitResult extends ModelKit {
  releaseDateTR: string;
  website: string;
  scrapedDate: string;
}
