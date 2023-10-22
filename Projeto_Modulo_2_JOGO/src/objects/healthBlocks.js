import ImageTile from "../game/imageTile.js";

export class HealthGREEN extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Green.png";
    }
}

export class HealthRedGreen extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "RedGreen.png";
    }
}

export class HealthRED extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Red.png";
    }
}
