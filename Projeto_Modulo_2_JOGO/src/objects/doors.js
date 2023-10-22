import SolidObject from "./solidObject.js";
import ImageTile from "../game/imageTile.js";

class Door extends ImageTile {

    constructor(position, doorIndex, destinationDoorIndex, destinationRoomIndex, isDoorOpen) {
        super(position, doorIndex, destinationDoorIndex, destinationRoomIndex, isDoorOpen);
        this.doorIndex = doorIndex;
        this.destinationDoorIndex = destinationDoorIndex;
        this.destinationRoomIndex = destinationRoomIndex;
        this.isOpen = isDoorOpen;
    }

}

export default Door;

export class DoorClosed extends Door {
    constructor(position, doorIndex, destinationDoorIndex, destinationRoomIndex, isDoorOpen, associatedKeyName) {
        super(position, doorIndex, destinationDoorIndex, destinationRoomIndex, isDoorOpen, associatedKeyName);
        this.isOpen = isDoorOpen;
        this.keyName = associatedKeyName;
    }

    get image() {
        if (this.isOpen) {
            return "DoorOpen.png";
        } else {
            return "DoorClosed.png";
        }
    }

    set changeCurrentDoorState(value) {
        this.isOpen = value;
    }
}

export class DoorWay extends Door {
    constructor(position, doorIndex, destinationDoorIndex, destinationRoomIndex) {
        super(position, doorIndex, destinationDoorIndex, destinationRoomIndex);
    }

    get image() {
        return "DoorWay.png";
    }
}