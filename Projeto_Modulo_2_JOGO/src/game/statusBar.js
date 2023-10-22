import ImageTile from "./imageTile.js";
import SolidObject from "../objects/solidObject.js";

export class StatusBar extends SolidObject {
    constructor(position) {
        super(position);
    }
}

export class StatusBarFloor extends StatusBar {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Black.png";
    }
}