import { Component, OnInit, Input } from '@angular/core';
import MapCell from '../classes/MapCell';

@Component({
  selector: 'app-map-cell',
  templateUrl: './map-cell.component.html',
  styleUrls: ['./map-cell.component.scss']
})
export class MapCellComponent implements OnInit {

  @Input()
  mapCell: MapCell;

  constructor() { }

  ngOnInit() {
  }

}
