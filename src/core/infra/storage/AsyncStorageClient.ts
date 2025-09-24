import { IStorage } from "@/core/contracts";
import Storage from 'expo-sqlite/kv-store';

export class AsyncStorageClient implements IStorage {
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const rawValue = await Storage.getItem(key);
      if (!rawValue) {
        return null;
      }
      const value = JSON.parse(rawValue) as T;
      return value;
    } catch (error) {
      console.log(`Error getting ${key}: ${error}`);
      return null;
    }
  }

  async set(key: string, value: any, ): Promise<void> {
    try {
      if (!value) {
        console.log(`${key} value is null or undefined`);
        return;
      }
      const stringifiedValue = JSON.stringify(value);
      return await Storage.setItem(key, stringifiedValue);
    } catch (error) {
      console.log(`Error setting ${key}: ${error}`);
      return;
    }
  }
  async remove(key: string): Promise<boolean> {
    try {
      await Storage.removeItem(key);
      return true;
    } catch (error) {
      console.log(`Error removing ${key}: ${error}`);
      return false;
    }
  }
  async exists(key: string): Promise<boolean> {
    try {
      return (await Storage.getAllKeys()).includes(key);
    } catch (error) {
      console.log(`Error checking if ${key} exists: ${error}`);
      return false;
    }
  }
}
