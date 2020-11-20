import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BattleMapToken } from 'src/app/classes/battle-map-token';

@Component({
  selector: 'app-edit-token-modal',
  templateUrl: './edit-token-modal.component.html',
  styleUrls: ['./edit-token-modal.component.scss']
})
export class EditTokenModalComponent implements OnInit {

  public modalOpen: boolean = false;

  public tokenForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    name: new FormControl(''),
    abbreviatedName: new FormControl(''),
    playerName: new FormControl(''),
    faction: new FormControl(0),
    type: new FormControl(''),
    color: new FormControl('')
  });

  public factionValues = [];
  public typeValues = [];
  public tempColor: string;

  public originalToken: BattleMapToken;
  public currentTokenState: BattleMapToken;

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
          value: BattleMapToken.TYPE[key]
        });
      }
    }
  }

  ngOnInit(): void {

  }

  public openColorPicker() {

  }

  public closeColorPicker() {
    console.log(this.tempColor);
  }

  public openModalWithToken(token: BattleMapToken) {
    this.originalToken = token;
    console.log(token.faction);
    this.tokenForm.patchValue({
      image: '',
      name: token.name,
      abbreviatedName: token.abbreviatedName,
      playerName: '',
      faction: token.faction,
      type: token.type
    });

    this.modalOpen = true;
  }

  public updateToken() {
    // Apply changes to original token from form.
    this.originalToken.name = this.tokenForm.value.name;
    this.originalToken.abbreviatedName = this.tokenForm.value.abbreviatedName;
    this.originalToken.faction = this.tokenForm.value.faction;

    // Reset form and close modal.
    this.tokenForm.reset();
    this.modalOpen = false;
  }

}
