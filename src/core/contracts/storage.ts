export interface IStorage {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<boolean>;
  exists(key: string): Promise<boolean>;
}
