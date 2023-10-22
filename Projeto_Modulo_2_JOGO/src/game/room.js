import Wall from "../objects/Environment/walls.js";
import Position from "../util/position.js";

import room0 from "../../rooms/room0.js";
import room1 from "../../rooms/room1.js";
import room2 from "../../rooms/room2.js";
import room3 from "../../rooms/room3.js";

import Key from "../objects/keys.js";
import { BadGuy, Bat, Skeleton, Thief } from "../objects/enemies.js";
import { Hammer, Sword, Meat } from "../objects/PickUpItems.js";
import { DoorClosed } from "../objects/doors.js";

class Room {
    constructor(roomIndex) {
        switch (roomIndex) {
            case 0:
                this.roomIndex = room0;
                break;
            case 1:
                this.roomIndex = room1;
                break;
            case 2:
                this.roomIndex = room2;
                break;
            case 3:
                this.roomIndex = room3;
                break;
        }
    }

    buildLevel(currentRoomIndex) {
        const roomLines = this.roomIndex.trim().split("\n").filter((line) => !line.startsWith("#"));
        const roomInfoLines = this.roomIndex.trim().split("\n").filter((line) => line.startsWith("#"));
        let roomDoors = [];
        const wallTiles = [];
        const monsters = [];
        const pickups = [];
        const doors = [];
        const keys = [];
        let doorThatNeedsKeyIndex = -1;
        let associatedKeyName = "";

        for (let i = 0; i < roomInfoLines.length; i++) {
            if(roomInfoLines[i].length !== 1){
                let roomInfo = roomInfoLines[i].split(' ');



                if(roomInfo.length !== 3){
                    roomInfo[3] = roomInfo[3].replace(/^\D+|\D+$/g, "");

                    if(roomInfo.length === 6){
                        doorThatNeedsKeyIndex = parseInt(roomInfo[1]);
                    }
                } else{
                    associatedKeyName = roomInfo[2]
                }
                roomDoors.push(roomInfo);
            }
        }

        for (let y = 0; y < roomLines.length; y++) {
            const line = roomLines[y];

            for (let x = 0; x < line.length; x++) {
                const position = new Position(x, y);
                const char = line.charAt(x);

                switch (char) {
                    case "0":
                        for (let i = 0; i < roomDoors.length; i++) {
                            if(roomDoors[i][1] === '0'){
                                doors.push(new DoorClosed(position, parseInt(roomDoors[i][1]), parseInt(roomDoors[i][4]), parseInt(roomDoors[i][3]), !(roomDoors[i][roomDoors[i].length - 1]).includes('key'), roomDoors[i][5] !== undefined ? roomDoors[i][5] : ""));
                            }
                        }
                        break;
                    case "1":
                        for (let i = 0; i < roomDoors.length; i++) {
                            if(roomDoors[i][1] === '1'){
                                doors.push(new DoorClosed(position, parseInt(roomDoors[i][1]), parseInt(roomDoors[i][4]), parseInt(roomDoors[i][3]), !(roomDoors[i][roomDoors[i].length - 1]).includes('key'), roomDoors[i][5] !== undefined ? roomDoors[i][5] : ""));
                            }
                        }
                        break;
                    case "2":
                        for (let i = 0; i < roomDoors.length; i++) {
                            if(roomDoors[i][1] === '2'){
                                doors.push(new DoorClosed(position, parseInt(roomDoors[i][1]), parseInt(roomDoors[i][4]), parseInt(roomDoors[i][3]), !(roomDoors[i][roomDoors[i].length - 1]).includes('key'), roomDoors[i][5] !== undefined ? roomDoors[i][5] : ""));
                            }
                        }
                        break;
                    case "3":
                        for (let i = 0; i < roomDoors.length; i++) {
                            if(roomDoors[i][1] === '3'){
                                doors.push(new DoorClosed(position, parseInt(roomDoors[i][1]), parseInt(roomDoors[i][4]), parseInt(roomDoors[i][3]), !(roomDoors[i][roomDoors[i].length - 1]).includes('key'), roomDoors[i][5] !== undefined ? roomDoors[i][5] : ""));
                            }
                        }
                        break;
                    case "W":
                        wallTiles.push(new Wall(position));
                        break;
                    case "S":
                        monsters.push(new Skeleton(position));
                        break;
                    case "B":
                        monsters.push(new Bat(position));
                        break;
                    case "G":
                        monsters.push(new BadGuy(position));
                        break;
                    case "T":
                        monsters.push(new Thief(position));
                        break;
                    case "h":
                        pickups.push(new Hammer(position));
                        break;
                    case "k":
                        pickups.push(new Key(position, currentRoomIndex, doorThatNeedsKeyIndex, associatedKeyName));
                        break;
                    case "m":
                        pickups.push(new Meat(position));
                        break;
                    case "s":
                        pickups.push(new Sword(position));
                        break;
                    default:
                        break;
                }
            }
        }

        return { wallTiles, monsters, pickups, doors, keys };
    }
}

export default Room;
