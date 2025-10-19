import { DragonFactory } from "./models/Dragon.js";
const DEFAULT_STORAGE_KEY = "dragonrealms.dragons";
// Lightweight localStorage wrapper to keep persistence logic isolated.
export class DragonStorageService {
    constructor(storage, key = DEFAULT_STORAGE_KEY) {
        this.storage = storage ?? DragonStorageService.resolveStorage();
        this.key = key;
    }
    load() {
        const raw = this.storage.getItem(this.key);
        if (!raw) {
            return [];
        }
        try {
            const data = JSON.parse(raw);
            return data.map((attrs) => DragonFactory.revive(attrs));
        }
        catch (error) {
            console.error("Failed to parse dragons from storage", error);
            return [];
        }
    }
    save(dragons) {
        const serialized = dragons.map((dragon) => dragon.toJSON());
        this.storage.setItem(this.key, JSON.stringify(serialized));
    }
    add(dragon) {
        const dragons = this.load();
        dragons.push(dragon);
        this.save(dragons);
        return dragons;
    }
    update(updatedDragon) {
        const dragons = this.load().map((dragon) => (dragon.id === updatedDragon.id ? updatedDragon : dragon));
        this.save(dragons);
        return dragons;
    }
    delete(id) {
        const dragons = this.load().filter((dragon) => dragon.id !== id);
        this.save(dragons);
        return dragons;
    }
    clear() {
        this.storage.removeItem(this.key);
    }
    static resolveStorage() {
        if (typeof window !== "undefined" && window.localStorage) {
            return window.localStorage;
        }
        return new FallbackStorage();
    }
}
// Provide a no-op fallback in non-browser contexts (e.g., tests, server).
class FallbackStorage {
    constructor() {
        this.store = new Map();
    }
    getItem(key) {
        return this.store.get(key) ?? null;
    }
    setItem(key, value) {
        this.store.set(key, value);
    }
    removeItem(key) {
        this.store.delete(key);
    }
}
//# sourceMappingURL=storage.js.map