import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d4',
  templateUrl: './d4.component.html',
  styleUrls: ['./d4.component.scss']
})
export class D4Component implements OnInit {
  public dice = new Dice(4);
  constructor() { }

  ngOnInit() {

  }
}
