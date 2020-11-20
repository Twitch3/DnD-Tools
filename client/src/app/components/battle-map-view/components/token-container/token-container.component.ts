import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BattleMapToken } from 'src/app/classes/battle-map-token';

@Component({
  selector: 'app-token-container',
  templateUrl: './token-container.component.html',
  styleUrls: ['./token-container.component.scss']
})
export class TokenContainerComponent implements OnInit {

  @Input()
  public tokens: BattleMapToken[] = [];

  @Input()
  public scale: number = 1;

  @Input()
  public cellSize: number = 30;

  @Output()
  public tokenClick: EventEmitter<BattleMapToken> = new EventEmitter();

  private tokenWasDragged: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public tokenDragged(token: BattleMapToken) {
    this.tokenWasDragged = true;
  }

  public tokenClicked(token: BattleMapToken) {
    if (!this.tokenWasDragged) {
      this.tokenClick.emit(token);
    } else {
      this.tokenWasDragged = false;
      // TODO: If dragging token ever needs to do something
      // console.log(token.name + ' was dragged');
    }
  }

}
