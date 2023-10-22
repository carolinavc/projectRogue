// move.js
import SolidObject from "./solidObject.js";

export class Move extends SolidObject {
    constructor(position) {
        super(position);
    }

    takeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            // Enemy is defeated
            this.defeated = true;
        }
    }
}

export default Move;
