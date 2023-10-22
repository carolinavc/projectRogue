import Interface from "./interface.js";
import Position from "../util/position.js";
import Floor from "../objects/Environment/floor.js";
import Room from "./room.js";
import Direction from "../util/direction.js";

import { StatusBarFloor } from "./statusBar.js";
import { FireballManager } from "./fireball.js";
import Hero, { HealthBar } from "../objects/hero.js";
import Key from "../objects/keys.js";

class Engine {
    gui = Interface.getInstance();
    hero;
    monsters;
    pickups;
    doors;
    keys;
    tiles;
    fireballManager;
    currentHeroPosition = new Position(3, 6);
    currentHero = new Hero(this.currentHeroPosition, this.gui);
    currentFireball = new FireballManager(this.gui, this.monsters, this.tiles);
    currentRoomDoors = [];
    currentHeroPickups = [];
    currentPickedUpKeys = [];

    buildRoom(roomIndex, destinationDoorIndex) {
        // Room
        this.currentRoom = new Room(roomIndex); // Create an instance of the Room class for the initial room
        let { wallTiles, monsters, pickups, doors, keys } = this.currentRoom.buildLevel(roomIndex);
        this.tiles = wallTiles;
        this.pickups = pickups;
        this.keys = keys;
        this.doors = doors;
        this.currentRoomDoors = doors;
        this.currentHeroPickups = pickups;

        // Floor
        let floorTiles = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                floorTiles.push(new Floor(position));
            }
        }

        if(destinationDoorIndex !== -1){
            for (let i = 0; i < this.currentRoomDoors.length; i++) {
                if (this.currentRoomDoors[i].doorIndex === destinationDoorIndex){
                    this.currentHero.position = this.currentRoomDoors[i].position;
                }
            }
        }

        if(this.currentPickedUpKeys.length !== 0){
            for (let j = 0; j < this.currentRoomDoors.length; j++){
                for (let i = 0; i < this.currentPickedUpKeys.length; i++) {
                    if(this.currentRoomDoors[j].keyName === this.currentPickedUpKeys[i].keyName){
                        this.currentRoomDoors[j].changeCurrentDoorState = true;
                    }
                }
            }

        }

        // Hero creation
        this.hero = this.currentHero; // posição herói room0

        // Status bar
        let statusBarTiles = [];
        for (let x = 0; x < 10; x++) {
            let position = new Position(x, -1); // Top row (y = 0)
            let statusBarTile = new StatusBarFloor(position);
            statusBarTiles.push(statusBarTile);
        }

        // Health bar
        let healthBarTiles = [];
        let healthBarPosition = new Position(3, -1);
        let healthBar = new HealthBar(healthBarPosition);
        healthBar.populateHealthBar(this.hero.currentHealth, this.hero.maxHealth);
        healthBarTiles = healthBar.healthBlocks;

        // Images placement
        this.gui.addImages(floorTiles);
        this.gui.addImages(wallTiles);
        this.gui.addImages(pickups);
        this.gui.addImages(doors);
        this.gui.addImages(keys);
        this.gui.addImages(monsters);
        this.gui.addImages(statusBarTiles);
        this.gui.addImages(healthBarTiles);
        this.gui.addImage(this.hero);

        // Enemy creation
        this.monsters = monsters;
        this.gui.start();

        // Fireball creation and management
        this.fireballManager = new FireballManager(
            this.gui,
            this.monsters,
            this.tiles
        );
        this.fireballManager.initialize();
    }

    init() {
        console.log("Engine init");
        this.buildRoom(0, -1);
    }

    checkDoorInteraction(){
        for (let i = 0; i < this.currentRoomDoors.length; i++){
            if((this.hero.getCurrentHeroPosition.x === this.currentRoomDoors[i].position.x) && (this.hero.getCurrentHeroPosition.y === this.currentRoomDoors[i].position.y)){
                if(this.currentRoomDoors[i].isOpen){
                    this.buildRoom(this.currentRoomDoors[i].destinationRoomIndex, this.currentRoomDoors[i].destinationDoorIndex);
                    break;
                }
            }
        }
    }

    checkKeyInteraction(){
        for (let i = 0; i < this.pickups.length; i++){
            if(this.pickups[i] instanceof Key){
                if((this.hero.getCurrentHeroPosition.x === this.pickups[i].position.x) && (this.hero.getCurrentHeroPosition.y === this.pickups[i].position.y))
                for (let j = 0; j < this.currentRoomDoors.length; j++){
                    if(this.currentRoomDoors[j].doorIndex === this.pickups[i].doorToUnlockIndex){
                        this.currentRoomDoors[j].changeCurrentDoorState = true;
                        this.currentPickedUpKeys.push(this.pickups[i]);
                    }
                }
            }
        }
    }

    // Movement Hero and enemies
    keyPressed(key) {
        if(this.currentHero.currentHealth > 0){
            console.log("User pressed key", key);

            let heroMoved = false;

            switch (key) {
                case "ArrowUp":
                    heroMoved = true;
                    this.hero.move("UP", this.monsters, this.tiles, this.pickups);
                    this.checkDoorInteraction();
                    this.checkKeyInteraction();
                    break;
                case "ArrowDown":
                    heroMoved = true;
                    this.hero.move("DOWN", this.monsters, this.tiles, this.pickups);
                    this.checkDoorInteraction();
                    this.checkKeyInteraction();
                    break;
                case "ArrowLeft":
                    heroMoved = true;
                    this.hero.move("LEFT", this.monsters, this.tiles, this.pickups);
                    this.checkDoorInteraction();
                    this.checkKeyInteraction();
                    break;
                case "ArrowRight":
                    heroMoved = true;
                    this.hero.move("RIGHT", this.monsters, this.tiles, this.pickups);
                    this.checkDoorInteraction();
                    this.checkKeyInteraction();
                    break;
                case "w":
                    console.log("FIREBALL");
                    try {
                        this.fireballManager.useFireball();
                        const fireballDirectionUp = new Direction("UP");
                        this.fireballManager.createFireball(
                            this.hero.position,
                            fireballDirectionUp
                        );
                    } catch (error) {
                        console.error(error.message);
                    }
                    break;
                case "s":
                    console.log("FIREBALL");
                    try {
                        this.fireballManager.useFireball();
                        const fireballDirectionDown = new Direction("DOWN");
                        this.fireballManager.createFireball(
                            this.hero.position,
                            fireballDirectionDown
                        );
                    } catch (error) {
                        console.error(error.message);
                    }
                    break;
                case "a":
                    console.log("FIREBALL");
                    try {
                        this.fireballManager.useFireball();
                        const fireballDirectionLeft = new Direction("LEFT");
                        this.fireballManager.createFireball(
                            this.hero.position,
                            fireballDirectionLeft
                        );
                    } catch (error) {
                        console.error(error.message);
                    }
                    break;
                case "d":
                    console.log("FIREBALL");
                    try {
                        this.fireballManager.useFireball();
                        const fireballDirectionRight = new Direction("RIGHT");
                        this.fireballManager.createFireball(
                            this.hero.position,
                            fireballDirectionRight
                        );
                    } catch (error) {
                        console.error(error.message);
                    }
                    break;
                default:
                    break;
            }
            if (heroMoved) {
                for (const monster of this.monsters) {
                    monster.move(this.hero.position, this.monsters, this.tiles);
                }
                try {
                    this.hero.pickUpItem(this.pickups);
                } catch (error) {
                    console.error(error.message);
                }
                this.hero.healthBar.populateHealthBar(
                    this.hero.currentHealth,
                    this.hero.maxHealth
                );
                const healthBarTiles = this.hero.healthBar.healthBlocks;
                this.gui.addImages(healthBarTiles);
            }
        }else{
            this.gui.showMessage("Morreu. Fim do jogo. Reinicie a página.", "warning", 5000);
        }
    }
    update() {
        this.fireballManager.update();
    }
}
export default Engine;
