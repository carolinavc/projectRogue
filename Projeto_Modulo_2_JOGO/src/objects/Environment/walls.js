import SolidObject from "../solidObject.js";

class Wall extends SolidObject {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Wall.png";
    }
}

export default Wall;
