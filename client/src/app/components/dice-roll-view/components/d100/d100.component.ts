import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d100',
  templateUrl: './d100.component.html',
  styleUrls: ['./d100.component.scss']
})
export class D100Component implements OnInit {
  public dice = new Dice(20);
  constructor() { }

  ngOnInit() { 

  }
}
