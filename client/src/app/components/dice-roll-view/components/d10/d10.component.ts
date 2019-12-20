import { Component, OnInit, Input } from '@angular/core';
import Dice from '../../Dice';

@Component({
  selector: 'app-d10',
  templateUrl: './d10.component.html',
  styleUrls: ['./d10.component.scss']
})
export class D10Component implements OnInit {

  @Input()
  public tensPlace: boolean;

  public dice = new Dice(10);
  constructor() { }

  ngOnInit() { 

  }
}
