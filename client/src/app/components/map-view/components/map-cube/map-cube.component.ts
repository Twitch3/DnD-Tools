import { Component, OnInit, Input } from '@angular/core';
import MapCell from '../classes/MapCell';

@Component({
  selector: 'app-map-cube',
  templateUrl: './map-cube.component.html',
  styleUrls: ['./map-cube.component.scss']
})
export class MapCubeComponent implements OnInit {

  @Input()
  mapCell: MapCell;

  constructor() { }

  ngOnInit() {
  }

  public shouldShowWall(neighborCell: MapCell) {
    if (neighborCell) {
      if (!neighborCell.traversable) {
        return false;
      }
    }
    return true;
  }

}
