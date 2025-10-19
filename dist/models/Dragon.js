export var DragonType;
(function (DragonType) {
    DragonType["Fire"] = "Fire";
    DragonType["Ice"] = "Ice";
    DragonType["Earth"] = "Earth";
    DragonType["Wind"] = "Wind";
    DragonType["Lightning"] = "Lightning";
    DragonType["Shadow"] = "Shadow";
})(DragonType || (DragonType = {}));
export class Dragon {
    constructor(attrs) {
        this.id = attrs.id ?? Dragon.generateId();
        this.name = attrs.name;
        this.type = attrs.type;
        this.age = attrs.age;
        this.powerLevel = attrs.powerLevel;
        this.specialAbilities = attrs.specialAbilities;
        this.createdAt = attrs.createdAt ? new Date(attrs.createdAt) : new Date();
    }
    describe() {
        const abilities = this.specialAbilities?.trim() ?? "mysterious instincts";
        return `${this.name} is a ${this.type} dragon, age ${this.age}, with power ${this.powerLevel}. Abilities: ${abilities}.`;
    }
    roar() {
        return `${this.name} lets out a fearsome roar!`;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            age: this.age,
            powerLevel: this.powerLevel,
            specialAbilities: this.specialAbilities,
            createdAt: this.createdAt.toISOString()
        };
    }
    static generateId() {
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
            return crypto.randomUUID();
        }
        return `dragon_${Math.random().toString(16).slice(2)}_${Date.now()}`;
    }
}
export class FireDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.flameIntensity = attrs.flameIntensity ?? 75;
    }
    attack() {
        return `${this.name} breathes fire with intensity ${this.flameIntensity}!`;
    }
    melt(target) {
        return `${this.name} melts ${target} into molten lava.`;
    }
}
export class IceDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.frostRadius = attrs.frostRadius ?? 30;
    }
    attack() {
        return `${this.name} unleashes a blizzard spanning ${this.frostRadius} feet!`;
    }
    freeze(target) {
        return `${this.name} freezes ${target} solid.`;
    }
}
export class EarthDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.tremorForce = attrs.tremorForce ?? 90;
    }
    attack() {
        return `${this.name} triggers a quake of force ${this.tremorForce}.`;
    }
    quake() {
        return `${this.name} rattles the ground violently.`;
    }
}
export class WindDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.galeSpeed = attrs.galeSpeed ?? 120;
    }
    attack() {
        return `${this.name} summons gusts at ${this.galeSpeed} mph!`;
    }
    whirlwind() {
        return `${this.name} forms a slicing cyclone.`;
    }
}
export class LightningDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.voltage = attrs.voltage ?? 100;
    }
    attack() {
        return `${this.name} strikes with ${this.voltage}k volts of lightning!`;
    }
    shock(target) {
        return `${this.name} electrifies ${target}.`;
    }
}
export class ShadowDragon extends Dragon {
    constructor(attrs) {
        super(attrs);
        this.shroudLevel = attrs.shroudLevel ?? 80;
    }
    attack() {
        return `${this.name} engulfs foes in shadows at level ${this.shroudLevel}.`;
    }
    vanish() {
        return `${this.name} fades into darkness without a trace.`;
    }
}
export class DragonFactory {
    static create(attrs) {
        switch (attrs.type) {
            case DragonType.Fire:
                return new FireDragon(attrs);
            case DragonType.Ice:
                return new IceDragon(attrs);
            case DragonType.Earth:
                return new EarthDragon(attrs);
            case DragonType.Wind:
                return new WindDragon(attrs);
            case DragonType.Lightning:
                return new LightningDragon(attrs);
            case DragonType.Shadow:
                return new ShadowDragon(attrs);
            default:
                throw new Error(`Unsupported dragon type: ${attrs.type}`);
        }
    }
    static revive(serialized) {
        return this.create({ ...serialized, createdAt: serialized.createdAt });
    }
}
//# sourceMappingURL=Dragon.js.map