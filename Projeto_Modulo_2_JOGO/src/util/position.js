class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    plus(vector) {
        return new Position(this.#x + vector.i, this.#y + vector.j);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    equals(position) {
        return this.#x === position?.x && this.#y === position?.y;
    }

    distanceTo(otherPosition) {
        const dx = this.x - otherPosition.x;
        const dy = this.y - otherPosition.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    toString() {
        return "(" + this.#x + ", " + this.#y + ")";
    }
}

export default Position;
