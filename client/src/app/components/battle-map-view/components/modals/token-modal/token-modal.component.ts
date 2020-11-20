import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BattleMapToken } from 'src/app/classes/battle-map-token';

export interface TokenModalForm {
  name: string;
  amount: number;
  faction: number;
  type: number;
}

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.scss']
})
export class TokenModalComponent implements OnInit {

  @Output()
  public tokenFormSubmit: EventEmitter<TokenModalForm> = new EventEmitter();

  public tokenForm: FormGroup = new FormGroup({
    name: new FormControl('Test'),
    amount: new FormControl(0),
    faction: new FormControl(BattleMapToken.FACTIONS.HOSTILE),
    type: new FormControl(0)
  });

  public factionValues = [];
  public typeValues = [];

  constructor() {
    for (const key in BattleMapToken.FACTIONS) {
      if (key) {
        this.factionValues.push({
          key: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          value: BattleMapToken.FACTIONS[key]
        });
      }
    }

    for (const key in BattleMapToken.TYPE) {
      if (key) {
        this.typeValues.push({
          key: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          value: BattleMapToken.FACTIONS[key]
        });
      }
    }
  }

  ngOnInit(): void {
  }

  public submitTokenForm() {
    this.tokenFormSubmit.emit(this.tokenForm.value);
  }

}
