import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d2',
  templateUrl: './d2.component.html',
  styleUrls: ['./d2.component.scss']
})
export class D2Component implements OnInit {
  
  public dice = new Dice(20);
  constructor() { }

  ngOnInit() { 

  }
}
