import { DragonFactory, DragonType, FireDragon } from "../models/Dragon";
import { DragonStorageService } from "../storage";
class MemoryStorage {
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
describe("DragonFactory", () => {
    it("creates a FireDragon instance with expected defaults", () => {
        const dragon = DragonFactory.create({
            name: "Inferno",
            type: DragonType.Fire,
            age: 120,
            powerLevel: 88
        });
        expect(dragon).toBeInstanceOf(FireDragon);
        expect(dragon.describe()).toContain("Inferno");
        expect(dragon.attack()).toContain("breathes fire");
    });
});
describe("DragonStorageService", () => {
    it("persists and reloads dragons", () => {
        const storage = new MemoryStorage();
        const service = new DragonStorageService(storage);
        const dragon = DragonFactory.create({
            name: "Glacier",
            type: DragonType.Ice,
            age: 300,
            powerLevel: 70,
            specialAbilities: "Frozen breath"
        });
        service.add(dragon);
        const rehydrated = service.load();
        expect(rehydrated).toHaveLength(1);
        expect(rehydrated[0].name).toBe("Glacier");
        expect(rehydrated[0].attack()).toContain("blizzard");
    });
});
//# sourceMappingURL=dragon.test.js.map