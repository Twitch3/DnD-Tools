import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d8',
  templateUrl: './d8.component.html',
  styleUrls: ['./d8.component.scss']
})
export class D8Component implements OnInit {

  public dice = new Dice(8);
  constructor() { }

  ngOnInit() { 

  }
}
