import { Injectable } from '@angular/core';
import MapDungeon from '../components/classes/MapDungeon';

@Injectable({
  providedIn: 'root'
})
export class MapCreationService {

  constructor() { }

  public createRandomFloor(width: number = 5, height: number = 5): number[][] {
    const floor = []
    for (let i = 0; i < width; i++) {
      const row = [];
      for (let j = 0; j < height; j++) {
        row.push(0);
      }
      floor.push(row);
    }
    return floor;
  }

  public createRandomDungeon(
    minWidth: number = 5, maxWidth: number = 10,
    minHeight: number = 5, maxHeight: number = 10,
    numFloors: number = 3
  ): MapDungeon {
    const map: number[][][] = [];
    for (let i = 0; i < numFloors; i++) {
      const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      map.push(this.createRandomFloor(width, height));
    }
    const dungeon: MapDungeon = new MapDungeon();
    dungeon.setUpDungeonFromArray(map);
    return dungeon
  }
}
