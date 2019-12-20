import { Injectable } from '@angular/core';
import MapDungeon from '../components/classes/MapDungeon';
import { BehaviorSubject } from 'rxjs';
import { MapCreationService } from './map-creation.service';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  private dungeon: MapDungeon;
  private dungeonSubject: BehaviorSubject<MapDungeon> = new BehaviorSubject<MapDungeon>(this.dungeon);

  constructor(private mapCreationService: MapCreationService) { }

  public getDungeonMap(): BehaviorSubject<MapDungeon> {
    return this.dungeonSubject;
  }

  public setMapDungeon(newDungeon: MapDungeon) {
    this.dungeon = newDungeon;
    this.dungeonSubject.next(this.dungeon);
  }

  public setRandomDungeon() {
    const randomDungeon = this.mapCreationService.createRandomDungeon();
    this.setMapDungeon(randomDungeon);
  }

  public setMapDungeonFromArray(mapArray: number[][][]) {
    const newDungeon: MapDungeon = new MapDungeon();
    newDungeon.setUpDungeonFromArray(mapArray);
    this.setMapDungeon(newDungeon);
  }

  public setMapDungeonFromSavedJSON(jsonString: string) {
    const savedJSON = JSON.parse(jsonString);
    if (savedJSON.dungeonFloors) {
      const newDungeon: MapDungeon = new MapDungeon();
      newDungeon.setUpDungeonFromJSON(savedJSON.dungeonFloors);
      this.setMapDungeon(newDungeon);
    }
  }
}
