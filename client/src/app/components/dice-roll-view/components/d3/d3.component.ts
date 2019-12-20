import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

  public dice = new Dice(20);
  constructor() { }

  ngOnInit() { 

  }

}
