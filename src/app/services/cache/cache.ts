export interface CacheItem<T> {
  key: string;
  isHit: boolean;
  value: T | undefined;
  expiresAt?: Date;
}

export interface Cache {
  getItem<T>(key: string): CacheItem<T>;
  save(item: CacheItem<any>): void;
  remove(item: CacheItem<any>): void;
  removeByKey(key: string): void;
  clear(): void;
  clearByPrefix(prefix: string): void;
  getKeysByPrefix(prefix: string): string[];
}
