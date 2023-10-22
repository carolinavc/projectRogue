import Direction from "../util/direction.js";
import SolidObject from "./solidObject.js";
import Vector2d from "../util/vector2d.js";
import Move from "./move.js";
import hero from "./hero.js";

class Enemy extends Move {
    constructor(position) {
        super(position);
        this.maxHealth = 1;
        this.attackDamage = 1;
        this.currentHealth = this.maxHealth;
        this.defeated = false;
    }

    setDefeated() {
        if (this.currentHealth <= 0){
            this.defeated = true;
        }
    }

    move(heroPosition, monsters, tiles) {
        if (this.currentHealth <= 0) {
            this.defeated = true;
            return;
        }

        let distanceThreshold = 3;
        let distanceVector = new Vector2d(
            heroPosition.x - this.position.x,
            heroPosition.y - this.position.y,
        );

        let distance = Math.abs(distanceVector.i) + Math.abs(distanceVector.j);

        if (distance < distanceThreshold) {
            let directionToHero = this.calculateDirection(distanceVector);

            let nextPosToHero = this.position.plus(directionToHero);

            // Verificar se há ou não colisão com o Herói antes de atualizar a posição do inimigo
            if (!this.collision(nextPosToHero, monsters, tiles) && !heroPosition.equals(nextPosToHero)
            ) {
                const collidesWithSolidObject = this.collision(nextPosToHero, monsters, tiles);

                if (!collidesWithSolidObject) {
                    this.position = nextPosToHero;
                } else {
                }
            } else {
            }
        } else {
            this.moveRandomly(monsters, tiles);
        }
    }

    collision(newPos, monsters, tiles) {
        for (const monster of monsters) {
            if (monster !== this && monster.position.equals(newPos)) {
                return true;
            }
        }

        for (const tile of tiles) {
            if (tile.position.equals(newPos) && tile instanceof SolidObject) {
                return true;
            }
        }

        return false;
    }

    calculateDirection(distanceVector) {
        if (Math.abs(distanceVector.i) >= Math.abs(distanceVector.j)) {
            return new Vector2d(distanceVector.i > 0 ? 1 : -1, 0);
        } else {
            return new Vector2d(0, distanceVector.j > 0 ? 1 : -1);
        }
    }

    moveRandomly(monsters, tiles) {
        if (this.currentHealth <= 0) {
            return;
        }

        let directions = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
        let randomDirection = directions[Math.floor(Math.random() * directions.length)];
        let vector = randomDirection.asVector();

        let newMonsterPosition = this.position.plus(vector);

        // Check for collision with walls or other enemies
        let collisionDetected = this.collision(newMonsterPosition, monsters, tiles) || this.detectEnemyCollision(newMonsterPosition, monsters);

        // Check if new position is within room boundaries
        let withinRoomBoundaries = this.isWithinRoomBoundaries(newMonsterPosition);

        // If collision detected or outside room boundaries, choose another random direction
        while (collisionDetected || !withinRoomBoundaries) {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
            vector = randomDirection.asVector();
            newMonsterPosition = this.position.plus(vector);
            collisionDetected = this.collision(newMonsterPosition, monsters, tiles) || this.detectEnemyCollision(newMonsterPosition, monsters);
            withinRoomBoundaries = this.isWithinRoomBoundaries(newMonsterPosition);
        }

        this.position = newMonsterPosition;
    }

    isWithinRoomBoundaries(position) {
        const minBoundary = 1;
        const maxBoundary = 9; // Adjust this value based on your room size
        return (
            position.x >= minBoundary &&
            position.x <= maxBoundary &&
            position.y >= minBoundary &&
            position.y <= maxBoundary
        );
    }

    detectEnemyCollision(newPos, monsters) {
        for (const monster of monsters) {
            if (monster !== this && monster.position.equals(newPos)) {
                return true;
            }
        }
        return false;
    }
}
export default Enemy;

export class Bat extends Enemy {
    constructor(position) {
        super(position);
        this.maxHealth = 1;
        this.attackDamage = 1;
        this.currentHealth = this.maxHealth;
        this.score = 1;
    }

    get image() {
        if (this.defeated) {
            return "Blood.gif";
        } else {
            return "Bat.gif";
        }
    }
}

export class Skeleton extends Enemy {
    constructor(position) {
        super(position);
        this.maxHealth = 2;
        this.attackDamage = 2;
        this.currentHealth = this.maxHealth;
        this.score = 2;

    }
    get image() {
        if (this.defeated) {
            return "Blood.gif";
        } else {
            return "Skeleton.gif";
        }
    }
}

export class BadGuy extends Enemy {
    constructor(position) {
        super(position);
        this.maxHealth = 3;
        this.attackDamage = 3;
        this.currentHealth = this.maxHealth;
        this.score = 4;

    }
    get image() {
        if (this.defeated) {
            return "Blood.gif";
        } else {
            return "BadGuy.gif";
        }
    }
}

export class Thief extends Enemy {
    constructor(position) {
        super(position);
        this.maxHealth = 6;
        this.attackDamage = 1;
        this.currentHealth = this.maxHealth;
        this.score = 6;

    }
    get image() {
        if (this.defeated) {
            return "Blood.gif";
        } else {
            return "Thief.gif";
        }
    }
    move(heroPosition, monsters, tiles) {
        if (this.currentHealth <= 0) {
            return;
        }

        const randomDirectionX = Math.random() < 0.5 ? -1 : 1;
        const randomDirectionY = Math.random() < 0.5 ? -1 : 1;
        const newPosition = this.position.plus(new Vector2d(randomDirectionX, randomDirectionY));

        if (!this.collision(newPosition, monsters, tiles) && !newPosition.equals(heroPosition)) {
            this.position = newPosition;
        }
    }
}
