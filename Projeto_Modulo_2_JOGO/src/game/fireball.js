import Interface from "./interface.js";
import Position from "../util/position.js";
import Direction from "../util/direction.js";
import Firetile from "./firetile.js";
export class Fireball extends Firetile {
    #direction;
    #active = false;
    #gui = Interface.getInstance();

    constructor(position, direction, enemies, walls) {
        super(position);
        this.#direction = direction;
        this.enemies = enemies;
        this.walls = walls;
    }

    get image() {
        return "Fire.gif";
    }

    start() {
        this.#active = true;
    }
    validateImpact() {
        for (const enemy of this.enemies) {
            if (enemy.position.equals(this.position) && enemy.currentHealth >=1) {
                enemy.currentHealth -= 4;
                if (enemy.currentHealth <= 0) {
                    enemy.setDefeated(); // Inimigo derrotado, muda imagem para Blood.
                   /* enemy.finalScore += enemy.score;
                    console.log('A sua pontuação é ', hero.finalScore) */
                }
                return true;
            }
        }

        for (const wall of this.walls) {
            if (wall.position.equals(this.position)) {
                return true;
            }
        }
        return false;
    }

    update() {
        if (!this.#active) return;
        this.position = this.position.plus(this.#direction.asVector());

        if (this.validateImpact()) {
            this.#active = false;
            setTimeout(() => {
                this.#gui.removeImage(this);
            }, 150);
        }
    }
}

export class FireballManager {
    constructor(gui, monsters, tiles) {
        this.gui = gui;
        this.fireballs = [];
        this.monsters = monsters;
        this.tiles = tiles;
    }

    initialize() {
        for (let i = 0; i < 3; i++) {
            const fireball = new Fireball(new Position(i, -1), Direction.UP,);
            this.fireballs.push(fireball);
            this.gui.addStatusImage(fireball);
        }
    }

    useFireball() {
        if (this.fireballs.length > 0) {
            const fireball = this.fireballs.pop();
            this.gui.removeStatusImage(fireball); // Remove fireball status image from the GUI
        } else {
          Interface.getInstance().showMessage("Não tem mais bolas de fogo.","warning" , 2000)
            throw new Error("Não tem mais bolas de fogo.");
        }
    }

    createFireball(position, direction) {
        const fireball = new Fireball(position, direction, this.monsters, this.tiles);
        this.gui.addImage(fireball);
        fireball.start();
    }

}
