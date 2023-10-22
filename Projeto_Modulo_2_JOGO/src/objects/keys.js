import {PickUpItem} from "./pickUpItems.js";

class Key extends PickUpItem {
    constructor(position, roomIndex, doorIndex, keyName) {
        super(position, roomIndex, doorIndex, keyName);
        this.keyName = keyName;
        this.roomWhereKeyIs = roomIndex;
        this.doorToUnlockIndex = doorIndex;
    }

    get image() {
        if (this.pickup) {
            return "Floor.png";
        } else {
            return "Key.png";
        }
    }
}

export default Key;