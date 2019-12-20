import { Component, OnInit } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d12',
  templateUrl: './d12.component.html',
  styleUrls: ['./d12.component.scss']
})
export class D12Component implements OnInit {

  public dice = new Dice(12);
  constructor() { }

  ngOnInit() { 

  }
}
