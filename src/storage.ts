import { AnyDragon, DragonAttributes, DragonFactory } from "./models/Dragon.js";

const DEFAULT_STORAGE_KEY = "dragonrealms.dragons";

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// Lightweight localStorage wrapper to keep persistence logic isolated.
export class DragonStorageService {
  private readonly storage: StorageAdapter;
  private readonly key: string;

  constructor(storage?: StorageAdapter, key: string = DEFAULT_STORAGE_KEY) {
    this.storage = storage ?? DragonStorageService.resolveStorage();
    this.key = key;
  }

  load(): AnyDragon[] {
    const raw = this.storage.getItem(this.key);
    if (!raw) {
      return [];
    }

    try {
      const data = JSON.parse(raw) as DragonAttributes[];
      return data.map((attrs) => DragonFactory.revive(attrs));
    } catch (error) {
      console.error("Failed to parse dragons from storage", error);
      return [];
    }
  }

  save(dragons: AnyDragon[]): void {
    const serialized = dragons.map((dragon) => dragon.toJSON());
    this.storage.setItem(this.key, JSON.stringify(serialized));
  }

  add(dragon: AnyDragon): AnyDragon[] {
    const dragons = this.load();
    dragons.push(dragon);
    this.save(dragons);
    return dragons;
  }

  update(updatedDragon: AnyDragon): AnyDragon[] {
    const dragons = this.load().map((dragon) => (dragon.id === updatedDragon.id ? updatedDragon : dragon));
    this.save(dragons);
    return dragons;
  }

  delete(id: string): AnyDragon[] {
    const dragons = this.load().filter((dragon) => dragon.id !== id);
    this.save(dragons);
    return dragons;
  }

  clear(): void {
    this.storage.removeItem(this.key);
  }

  private static resolveStorage(): StorageAdapter {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }

    return new FallbackStorage();
  }
}

// Provide a no-op fallback in non-browser contexts (e.g., tests, server).
class FallbackStorage implements StorageAdapter {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }
}
