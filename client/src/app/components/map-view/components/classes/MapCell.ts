import MapFloor from './MapFloor';

export default class MapCell {
    public static CELL_TYPE = {
        void: 0,
        floor: 1,
        stairs: 2
    };

    private x: number;
    private y: number;
    public traversable: boolean;
    public doors = {
        north: false,
        south: false,
        east: false,
        west: false
    };

    public hasStairs: boolean = false;
    public hasEvent: boolean = false
    // TODO: Possible other way to have event details? Might be able to have new map interactions
    public eventDetails: string;

    private floor: MapFloor;

    constructor(x: number, y: number, traversable: boolean, floor: MapFloor) {
        this.x = x;
        this.y = y;
        this.traversable = traversable;
        this.floor = floor;
    }

    public getNorthNeighbor() {
        return this.floor.getCellNorthOf(this);
    }

    public getSouthNeighbor() {
        return this.floor.getCellSouthOf(this);
    }

    public getEastNeighbor() {
        return this.floor.getCellEastOf(this);
    }
    
    public getWestNeighbor() {
        return this.floor.getCellWestOf(this);
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public setNorthDoor() {
        this.doors.north = true;
    }

    public setSouthDoor() {
        this.doors.south = true;
    }

    public setEastDoor() {
        this.doors.east = true;
    }

    public setWestDoor() {
        this.doors.west = true;
    }

    public getMapCellJSON() {
        return {
            doors: this.doors,
            hasStairs: this.hasStairs,
            hasEvent: this.hasEvent,
            eventDetails: this.eventDetails,
            x: this.x,
            y: this.y,
            traversable: this.traversable
        };
    }
}