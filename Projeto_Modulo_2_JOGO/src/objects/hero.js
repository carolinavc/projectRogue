import Interface from "../game/interface.js";
import Direction from "../util/direction.js";
import Position from "../util/position.js";

import Move from "./move.js";
import SolidObject from "./solidObject.js";

import { StatusBar } from "../game/statusBar.js";
import { HealthGREEN, HealthRedGreen, HealthRED } from "./healthBlocks.js";
import { Hammer, Sword, Meat } from "./PickUpItems.js";
import Key from "./keys.js";

class Hero extends Move {

    currentPosition;
    constructor(position) {
        super(position);
        this.heroMoved = false;
        this.attackDamage = 1;
        this.maxHealth = 8;
        this.currentHealth = this.maxHealth;
        this.healthBar = new HealthBar(new Position(3, -1));
        this.removeImage = null;
        this.currentPosition = position;

        this.InitialPositionPickupItems = new Position(7, -1);
        this.index = 0;
    }

    get image() {
        if(this.currentHealth > 0){
            return "Hero.png";
        }else{
            return "Hero_dead.png";
        }
    }

    get getCurrentHeroPosition() {
        return this.currentPosition;
    }

    set changeCurrentHeroPosition(newPosition) {
        this.currentPosition = newPosition;
    }

    move(direction, monsters, tiles) {
        const vector = Direction[direction].asVector();
        const newHeroPosition = this.position.plus(vector);
        let heroCollided = false;
        let enemyCollision = false;

        // Verificar colisão com tile que são uma instância de SolidObject
        for (const tile of tiles) {
            if (
                tile.position.equals(newHeroPosition) &&
                tile instanceof SolidObject
            ) {
                heroCollided = true;
                break;
            }
        }


        if (!heroCollided) {
            // Verificar colisões com monstros que são uma instância de SolidObject
            for (const monster of monsters) {
                if (monster.position.equals(newHeroPosition)) {
                    enemyCollision = true;
                    break;
                }
            }

            if (!enemyCollision) {
                // Movimento herói
                this.position = newHeroPosition;
                this.heroMoved = true;
                this.changeCurrentHeroPosition = newHeroPosition;
            } else {
                // Resolver a colisão com o inimigo, ou seja, se houver uma colisão,Herói ataca inimigo. e depois inimigo ataca Herói.
                const enemy = monsters.find((monster) =>
                    monster.position.equals(newHeroPosition)
                );

                if (enemy.currentHealth > 1) {
                    enemy.takeDamage(this.attackDamage); // Dano dado ao inimigo. Reduz vida do inimigo em 1.
                    this.currentHealth -= enemy.attackDamage; // Reduz a vida do herói pelo valor do dano do inimigo.
                } else {
                    enemy.takeDamage(this.attackDamage); // Dano dado ao inimigo. Reduz a vida do inimigo pelo valor do dano do herói.
                    enemy.setDefeated()
                    this.healthBar.updateHealthBar(this.currentHealth, this.maxHealth);
                    /* this.finalScore += enemy.score;
                     console.log('A sua pontuação é ', this.finalScore) */

                    // Remover inimigo do array
                    const emenyIndex = monsters.indexOf(enemy);
                    if (emenyIndex !== -1) {
                        monsters.splice(emenyIndex, 1);
                    }
                }
            }
        }
        return this.heroMoved;
    }


    pickUpItem(pickups) {
        const PickupItems = [];
        const pickupItemsCount = 3;

        const item = pickups.find((pickup) => pickup.position.equals(this.position));

        const position = new Position(this.InitialPositionPickupItems.x + this.index, this.InitialPositionPickupItems.y);

        // Carne
        if (item instanceof Meat) {
            if (this.currentHealth === this.maxHealth) {
                Interface.getInstance().showMessage("Meat não foi apanhada. Vida do herói cheia!","error" , 2000)
                throw new Error("Meat não foi apanhada. Vida do herói cheia!");
            }

            item.heroHealing(this, item.healing); // Carne a curar o herói para amount
            this.healthBar.updateHealthBar(this.currentHealth, this.maxHealth);
            item.setpickup(true);
            Interface.getInstance().removeImage(item)  // Linha que remove a carne

            // Marreta
        } else if (item instanceof Hammer) {
            item.setpickup(true);
            this.attackDamage += 2; // Martelo aumenta o dano do herói por 2

            let hammerStatusBar = new Hammer(position);
            PickupItems.push(hammerStatusBar);
            Interface.getInstance().removeImage(item)
            Interface.getInstance().addStatusImage(hammerStatusBar);

            this.index++;

            // Espada
        } else if (item instanceof Sword) {
            item.setpickup(true);

            let SwordStatusBar = new Sword(position);
            PickupItems.push(SwordStatusBar);
            Interface.getInstance().removeImage(item)
            Interface.getInstance().addStatusImage(SwordStatusBar);

            Interface.getInstance().showMessage("Parabéns! Relíquia adquirida!","success" , 2000)

            this.index++;
            //Chave
        } else if (item instanceof Key) {
            item.setpickup(true);
            Interface.getInstance().removeImage(item);
            this.index++;
        }

      if (PickupItems.length === pickupItemsCount){
            throw new Error(Interface.getInstance().showMessage("Inventário cheio!"));
        }

        // Remove o item do array
        const itemIndex = pickups.findIndex((pickup) => pickup === item);
        if (itemIndex !== -1) {
            pickups.splice(itemIndex, 1);
        }
    }
}

export default Hero;

export class HealthBar extends StatusBar {
    constructor(position) {
        super(position);
        this.healthBlocks = [];
    }

    clearBlocks() {
        this.healthBlocks = [];
    }

    populateHealthBar(currentHealth, maxHealth) {
        const healthBarSize = 4;

        // Check if currentHealth is less than zero and set it to zero if true
        if (currentHealth < 0) {
            currentHealth = 0;
        }

        const greenBlocks = Math.min(Math.floor(currentHealth / 2), healthBarSize);
        const redGreenBlock = currentHealth % 2 === 1 && currentHealth !== maxHealth;
        const remainingBlocks = healthBarSize - greenBlocks - (redGreenBlock ? 1 : 0);

        for (let i = 0; i < greenBlocks; i++) {
            const greenBlock = new HealthGREEN(
                new Position(this.position.x + i, this.position.y)
            );
            this.healthBlocks.push(greenBlock);
        }

        if (redGreenBlock) {
            const greenRedBlock = new HealthRedGreen(
                new Position(this.position.x + greenBlocks, this.position.y)
            );
            this.healthBlocks.push(greenRedBlock);
        }

        for (let i = 0; i < remainingBlocks; i++) {
            const redBlock = new HealthRED(
                new Position(
                    this.position.x + greenBlocks + i + (redGreenBlock ? 1 : 0),
                    this.position.y
                )
            );
            this.healthBlocks.push(redBlock);
        }
    }

    // Atualizar barra conforme o valor da vida do herói
    updateHealthBar(currentHealth, maxHealth) {
        this.clearBlocks();
        this.populateHealthBar(currentHealth, maxHealth);
    }
}