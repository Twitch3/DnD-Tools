import MapCell from './MapCell';
import MapFloor from './MapFloor';

export default class MapDungeon {

    public dungeonFloors: MapFloor[] = [];

    constructor() { }

    public setUpDungeonFromArray(floorMaps: number[][][]) {
        floorMaps.forEach(mapArray => {
            const floor: MapFloor = new MapFloor();
            floor.setUpFloorFromArray(mapArray);
            this.dungeonFloors.push(floor);
        });
    }

    public setUpDungeonFromJSON(dungeonFloorJSON) {
        dungeonFloorJSON.forEach((floorJSON) => {
            const floor: MapFloor = new MapFloor();
            floor.setUpFloorFromJSON(floorJSON);
            this.dungeonFloors.push(floor);
        });
    }

    public getDungeonFloorMap(floor: number): MapFloor {
        if (floor >= 0 && this.dungeonFloors[floor]) {
            return this.dungeonFloors[floor];
        }

        return undefined;
    }


}