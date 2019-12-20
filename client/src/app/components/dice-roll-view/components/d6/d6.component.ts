import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d6',
  templateUrl: './d6.component.html',
  styleUrls: ['./d6.component.scss']
})
export class D6Component implements OnInit {
  public dice = new Dice(6);
  constructor() { }

  ngOnInit() { 

  }
}
