export enum DragonType {
  Fire = "Fire",
  Ice = "Ice",
  Earth = "Earth",
  Wind = "Wind",
  Lightning = "Lightning",
  Shadow = "Shadow"
}

export interface DragonAttributes {
  id?: string;
  name: string;
  type: DragonType;
  age: number;
  powerLevel: number;
  specialAbilities?: string;
  createdAt?: string | Date;
}

export abstract class Dragon {
  readonly id: string;
  readonly createdAt: Date;

  name: string;
  type: DragonType;
  age: number;
  powerLevel: number;
  specialAbilities?: string;

  protected constructor(attrs: DragonAttributes) {
    this.id = attrs.id ?? Dragon.generateId();
    this.name = attrs.name;
    this.type = attrs.type;
    this.age = attrs.age;
    this.powerLevel = attrs.powerLevel;
    this.specialAbilities = attrs.specialAbilities;
    this.createdAt = attrs.createdAt ? new Date(attrs.createdAt) : new Date();
  }

  abstract attack(): string;

  describe(): string {
    const abilities = this.specialAbilities?.trim() ?? "mysterious instincts";
    return `${this.name} is a ${this.type} dragon, age ${this.age}, with power ${this.powerLevel}. Abilities: ${abilities}.`;
  }

  roar(): string {
    return `${this.name} lets out a fearsome roar!`;
  }

  toJSON(): DragonAttributes {
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

  private static generateId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }

    return `dragon_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }
}

export class FireDragon extends Dragon {
  flameIntensity: number;

  constructor(attrs: DragonAttributes & { flameIntensity?: number }) {
    super(attrs);
    this.flameIntensity = attrs.flameIntensity ?? 75;
  }

  attack(): string {
    return `${this.name} breathes fire with intensity ${this.flameIntensity}!`;
  }

  melt(target: string): string {
    return `${this.name} melts ${target} into molten lava.`;
  }
}

export class IceDragon extends Dragon {
  frostRadius: number;

  constructor(attrs: DragonAttributes & { frostRadius?: number }) {
    super(attrs);
    this.frostRadius = attrs.frostRadius ?? 30;
  }

  attack(): string {
    return `${this.name} unleashes a blizzard spanning ${this.frostRadius} feet!`;
  }

  freeze(target: string): string {
    return `${this.name} freezes ${target} solid.`;
  }
}

export class EarthDragon extends Dragon {
  tremorForce: number;

  constructor(attrs: DragonAttributes & { tremorForce?: number }) {
    super(attrs);
    this.tremorForce = attrs.tremorForce ?? 90;
  }

  attack(): string {
    return `${this.name} triggers a quake of force ${this.tremorForce}.`;
  }

  quake(): string {
    return `${this.name} rattles the ground violently.`;
  }
}

export class WindDragon extends Dragon {
  galeSpeed: number;

  constructor(attrs: DragonAttributes & { galeSpeed?: number }) {
    super(attrs);
    this.galeSpeed = attrs.galeSpeed ?? 120;
  }

  attack(): string {
    return `${this.name} summons gusts at ${this.galeSpeed} mph!`;
  }

  whirlwind(): string {
    return `${this.name} forms a slicing cyclone.`;
  }
}

export class LightningDragon extends Dragon {
  voltage: number;

  constructor(attrs: DragonAttributes & { voltage?: number }) {
    super(attrs);
    this.voltage = attrs.voltage ?? 100;
  }

  attack(): string {
    return `${this.name} strikes with ${this.voltage}k volts of lightning!`;
  }

  shock(target: string): string {
    return `${this.name} electrifies ${target}.`;
  }
}

export class ShadowDragon extends Dragon {
  shroudLevel: number;

  constructor(attrs: DragonAttributes & { shroudLevel?: number }) {
    super(attrs);
    this.shroudLevel = attrs.shroudLevel ?? 80;
  }

  attack(): string {
    return `${this.name} engulfs foes in shadows at level ${this.shroudLevel}.`;
  }

  vanish(): string {
    return `${this.name} fades into darkness without a trace.`;
  }
}

export type AnyDragon =
  | FireDragon
  | IceDragon
  | EarthDragon
  | WindDragon
  | LightningDragon
  | ShadowDragon;

export class DragonFactory {
  static create(attrs: DragonAttributes): AnyDragon {
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

  static revive(serialized: DragonAttributes): AnyDragon {
    return this.create({ ...serialized, createdAt: serialized.createdAt });
  }
}
