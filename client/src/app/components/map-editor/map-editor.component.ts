import { Component, OnInit } from '@angular/core';
import MapCell from '../map-view/components/classes/MapCell';
import { MapCreationService } from '../map-view/services/map-creation.service';
import MapDungeon from '../map-view/components/classes/MapDungeon';
import { MapViewService } from '../map-view/services/map-view.service';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent implements OnInit {

  public selectedCell: MapCell;

  constructor(private mapCreationService: MapCreationService, private mapViewService: MapViewService) { }

  

  ngOnInit() {
    this.mapViewService.setRandomDungeon();
  }

  // event has properties "cell: MapCell" and "middleClick?: boolean"
  public editCell(event) {
    if (!event.middleClick) {
      event.cell.traversable = !event.cell.traversable;
    } else {
      this.selectedCell = event.cell;
    }
  }

  public modalClosed() {
    this.selectedCell = undefined;
  }

}
