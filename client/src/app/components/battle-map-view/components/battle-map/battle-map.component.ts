import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerToken } from 'src/app/classes/player-token';
import { BattleMapToken } from 'src/app/classes/battle-map-token';

// TODO: Update as necessary as map features expand
export interface BattleMapState {
  tokens?: BattleMapToken[];
  cellSize?: number;
  mapImage?: string;
}

@Component({
  selector: 'app-battle-map',
  templateUrl: './battle-map.component.html',
  styleUrls: ['./battle-map.component.scss']
})
export class BattleMapComponent implements OnInit {

  @Input()
  public tokens: BattleMapToken[];

  @Input()
  public cellSize: number = 30;

  @Input()
  public url: string;

  @Output()
  public tokenClick: EventEmitter<BattleMapToken> = new EventEmitter();

  public mapScale: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public onScroll($event: WheelEvent) {
    if ($event.deltaY < 0) {
      this.mapScale += 0.05;
    } else if ($event.deltaY > 0) {
      this.mapScale -= 0.05;
    }
  }

  public tokenClicked(token: BattleMapToken) {
    this.tokenClick.emit(token);
  }

}
