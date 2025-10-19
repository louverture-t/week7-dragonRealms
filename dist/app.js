import { DragonFactory, DragonType } from "./models/Dragon.js";
import { DragonStorageService } from "./storage.js";
class DragonApp {
    constructor() {
        this.storage = new DragonStorageService();
        this.form = document.querySelector("#dragon-form");
        this.list = document.querySelector("#dragon-list");
        this.powerSlider = document.querySelector("#dragon-power");
        this.powerOutput = document.querySelector("#dragon-power-output");
        this.editingDragonId = null;
    }
    init() {
        console.log("DragonApp initialized");
        this.bindForm();
        this.bindPowerSlider();
        this.renderDragons();
    }
    bindForm() {
        if (!this.form) {
            console.warn("Dragon form not found; skipping form setup.");
            return;
        }
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.clearErrors();
            const formData = new FormData(this.form);
            const name = String(formData.get("name") ?? "").trim();
            const type = formData.get("type");
            const age = Number(formData.get("age"));
            const powerLevel = Number(formData.get("powerLevel"));
            const specialAbilities = String(formData.get("specialAbilities") ?? "").trim();
            // Comprehensive validation
            const errors = this.validateForm(name, type, age, powerLevel, specialAbilities);
            if (errors.length > 0) {
                this.displayErrors(errors);
                return;
            }
            const dragonData = {
                name,
                type: DragonType[type],
                age,
                powerLevel,
                specialAbilities: specialAbilities || undefined
            };
            if (this.editingDragonId) {
                // Update existing dragon
                const dragon = DragonFactory.create({ ...dragonData, id: this.editingDragonId });
                this.storage.update(dragon);
                this.editingDragonId = null;
                this.updateFormButton("Create Dragon");
            }
            else {
                // Create new dragon
                const dragon = DragonFactory.create(dragonData);
                this.storage.add(dragon);
            }
            this.resetForm();
            this.renderDragons();
        });
    }
    bindPowerSlider() {
        if (!this.powerSlider || !this.powerOutput) {
            return;
        }
        this.powerOutput.value = this.powerSlider.value;
        this.powerSlider.addEventListener("input", () => {
            this.powerOutput.value = this.powerSlider.value;
        });
    }
    validateForm(name, type, age, powerLevel, specialAbilities) {
        const errors = [];
        // Name validation
        if (!name) {
            errors.push("Name is required");
        }
        else if (name.length < 2) {
            errors.push("Name must be at least 2 characters long");
        }
        else if (name.length > 30) {
            errors.push("Name must be 30 characters or less");
        }
        else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            errors.push("Name can only contain letters, spaces, apostrophes, and hyphens");
        }
        // Type validation
        if (!type) {
            errors.push("Dragon type is required");
        }
        // Age validation
        if (isNaN(age) || age < 1 || age > 1000) {
            errors.push("Age must be between 1 and 1000 years");
        }
        // Power level validation
        if (isNaN(powerLevel) || powerLevel < 1 || powerLevel > 100) {
            errors.push("Power level must be between 1 and 100");
        }
        // Special abilities validation
        if (specialAbilities.length > 200) {
            errors.push("Special abilities must be 200 characters or less");
        }
        return errors;
    }
    displayErrors(errors) {
        errors.forEach((error, index) => {
            const fieldName = this.getFieldNameFromError(error);
            const errorElement = document.querySelector(`[data-error-for="dragon-${fieldName}"]`);
            if (errorElement) {
                errorElement.textContent = error;
            }
        });
    }
    clearErrors() {
        document.querySelectorAll('.field-error').forEach(el => {
            el.textContent = '';
        });
    }
    getFieldNameFromError(error) {
        if (error.includes('Name'))
            return 'name';
        if (error.includes('type'))
            return 'type';
        if (error.includes('Age'))
            return 'age';
        if (error.includes('Power'))
            return 'power';
        if (error.includes('abilities'))
            return 'abilities';
        return 'name';
    }
    resetForm() {
        this.form?.reset();
        if (this.powerOutput) {
            this.powerOutput.value = "50";
        }
        this.clearErrors();
    }
    updateFormButton(text) {
        const button = this.form?.querySelector('button[type="submit"]');
        if (button) {
            button.textContent = text;
        }
    }
    editDragon(dragon) {
        if (!this.form)
            return;
        // Populate form with dragon data
        const nameInput = this.form.querySelector('#dragon-name');
        const typeSelect = this.form.querySelector('#dragon-type');
        const ageInput = this.form.querySelector('#dragon-age');
        const powerInput = this.form.querySelector('#dragon-power');
        const abilitiesTextarea = this.form.querySelector('#dragon-abilities');
        if (nameInput)
            nameInput.value = dragon.name;
        if (typeSelect)
            typeSelect.value = dragon.type;
        if (ageInput)
            ageInput.value = dragon.age.toString();
        if (powerInput) {
            powerInput.value = dragon.powerLevel.toString();
            if (this.powerOutput)
                this.powerOutput.value = dragon.powerLevel.toString();
        }
        if (abilitiesTextarea)
            abilitiesTextarea.value = dragon.specialAbilities || '';
        this.editingDragonId = dragon.id;
        this.updateFormButton("Update Dragon");
        // Scroll to form
        this.form.scrollIntoView({ behavior: 'smooth' });
    }
    renderDragons() {
        const list = this.list;
        if (!list) {
            console.error("Dragon list element not found!");
            return;
        }
        const dragons = this.storage.load();
        console.log(`Rendering ${dragons.length} dragons`);
        list.innerHTML = "";
        if (!dragons.length) {
            const empty = document.createElement("p");
            empty.textContent = "No dragons yet. Create one to begin your collection.";
            empty.style.color = "#888";
            empty.style.fontStyle = "italic";
            empty.style.textAlign = "center";
            empty.style.padding = "2rem";
            list.append(empty);
            return;
        }
        const template = document.querySelector("#dragon-card-template");
        if (!template) {
            console.warn("Dragon card template missing.");
            return;
        }
        dragons.forEach((dragon) => {
            const fragment = template.content.cloneNode(true);
            const card = fragment.querySelector('.dragon-card');
            if (!card) {
                return;
            }
            card.dataset.type = dragon.type;
            const nameEl = fragment.querySelector(".dragon-name");
            const metaEl = fragment.querySelector(".dragon-meta");
            const abilitiesEl = fragment.querySelector(".dragon-abilities");
            if (nameEl) {
                nameEl.textContent = `${dragon.name} (${dragon.type})`;
            }
            if (metaEl) {
                const created = dragon.createdAt.toLocaleDateString();
                metaEl.textContent = `Age ${dragon.age} · Power ${dragon.powerLevel} · Added ${created}`;
            }
            if (abilitiesEl) {
                abilitiesEl.textContent = dragon.specialAbilities ?? "No recorded abilities.";
            }
            fragment.querySelectorAll("button[data-action]").forEach((button) => {
                const action = button.dataset.action;
                button.addEventListener("click", () => {
                    if (action === "delete") {
                        if (confirm(`Are you sure you want to delete ${dragon.name}?`)) {
                            this.storage.delete(dragon.id);
                            this.renderDragons();
                        }
                        return;
                    }
                    if (action === "edit") {
                        this.editDragon(dragon);
                        return;
                    }
                    if (action === "attack") {
                        alert(dragon.attack());
                    }
                    else if (action === "roar") {
                        alert(dragon.roar());
                    }
                });
            });
            list.append(fragment);
        });
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const app = new DragonApp();
    app.init();
});
//# sourceMappingURL=app.js.map