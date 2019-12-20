import MapCell from './MapCell';

export default class MapFloor {
    private grid = {
        height: 0,
        width: 0,
        cells: {}
    };
    private cellArray: MapCell[][] = [];

    constructor() { }

    public getCellNorthOf(cell: MapCell) {
        const x = cell.getX();
        const y = cell.getY() - 1;
        if (this.grid.cells[y] && this.grid.cells[y][x]) {
            return this.grid.cells[y][x];
        }

        return undefined;
    }

    public getCellSouthOf(cell: MapCell) {
        const x = cell.getX();
        const y = cell.getY() + 1;
        if (this.grid.cells[y] && this.grid.cells[y][x]) {
            return this.grid.cells[y][x];
        }

        return undefined;
    }

    public getCellEastOf(cell: MapCell) {
        const x = cell.getX() + 1;
        const y = cell.getY();
        if (this.grid.cells[y] && this.grid.cells[y][x]) {
            return this.grid.cells[y][x];
        }

        return undefined;
    }

    public getCellWestOf(cell: MapCell) {
        const x = cell.getX() - 1;
        const y = cell.getY();
        if (this.grid.cells[y] && this.grid.cells[y][x]) {
            return this.grid.cells[y][x];
        }

        return undefined;
    }

    public getCellArray() {
        return this.cellArray;
    }

    public getMapFloorJSON() {
        const floorJSON = {
            grid: {
                height: this.grid.height,
                width: this.grid.width,
            },
            cellArray: []
        };
        this.cellArray.forEach(row => {
            const rowJSON = [];
            row.forEach((cell: MapCell) => {
                rowJSON.push(cell.getMapCellJSON());
            });
            floorJSON.cellArray.push(rowJSON);
        });
        return floorJSON;
    }

    public setUpFloorFromArray(mapArray: number[][]) {
        this.grid.height = mapArray.length;
        for (let y = 0; y < mapArray.length; y++) {
            this.grid.width = mapArray[y].length;
            const newCellRow = [];    
            for (let x = 0; x < mapArray[y].length; x++) {
                const traversable = mapArray[y][x] ? true : false;
                const newCell = new MapCell(x, y, traversable, this);
                if (!this.grid.cells[y]) {
                    this.grid.cells[y] = {};
                }
                newCellRow.push(newCell);
                this.grid.cells[y][x] = newCell;
            }
            this.cellArray.push(newCellRow);
        }
    }

    public setUpFloorFromJSON(floorJSON) {
        this.grid.height = floorJSON.grid.height;
        this.grid.width = floorJSON.grid.width;
        floorJSON.cellArray.forEach( (rowJSON, index) => {
            const newCellRow = [];
            rowJSON.forEach( (cellJSON) => {
                const x = cellJSON.x;
                const y = cellJSON.y;
                const newCell: MapCell = new MapCell(
                    x,
                    y,
                    cellJSON.traversable,
                    this
                );
                if (!this.grid.cells[y]) {
                    this.grid.cells[y] = {};
                }
                newCellRow.push(newCell);
                this.grid.cells[y][x] = newCell;
            });
            this.cellArray.push(newCellRow);
        });
    }

    public setUpRandomFloor() {
        // TODO: Just build a map generator lul
    }
}