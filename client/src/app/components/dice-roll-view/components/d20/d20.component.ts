import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d20',
  templateUrl: './d20.component.html',
  styleUrls: ['./d20.component.scss']
})
export class D20Component implements OnInit {

  public dice = new Dice(20);
  constructor() { }

  ngOnInit() { 

  }
}
