import ImageTile from "../game/imageTile.js";

export class PickUpItem extends ImageTile {
    constructor(position) {
        super(position);
        this.pickup = false;
    }

    setpickup() {
        this.pickup = true;
    }
}


export class Hammer extends PickUpItem {
    constructor(position) {
        super(position);
        this.attackDamage = 2;
    }

    get image() {
        if (this.pickup) {
            return "Floor.png";
        } else {
            return "Hammer.png";
        }
    }
}

export class Sword extends PickUpItem {
    constructor(position) {
        super(position);
        this.attackDamage = 3;
    }

    get image() {
        if (this.pickup) {
            return "Floor.png";
        } else {
            return "Sword2.gif";
        }
    }
}

export class Meat extends PickUpItem {
    constructor(position) {
        super(position);
        this.healing = 2;
    }

    heroHealing(hero, amount) {
        if (hero.currentHealth === 7) {
            this.healing = 1
            hero.currentHealth += 1;
        } else {
            hero.currentHealth += amount;
            console.log('Herói curou', amount);
        }
    }

    get image() {
        if (this.pickup) {
            return "Floor.png";
        } else {
            return "GoodMeat.png";
        }
    }
}


