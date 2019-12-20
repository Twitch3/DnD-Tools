import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import MapCell from 'src/app/components/map-view/components/classes/MapCell';

@Component({
  selector: 'app-cell-editor-modal',
  templateUrl: './cell-editor-modal.component.html',
  styleUrls: ['./cell-editor-modal.component.scss']
})
export class CellEditorModalComponent implements OnInit {

  @HostListener('window:keydown', ['$event']) onKeyDown($event) {
    if ($event.keyCode === 27) {
      this.close();
    }
  }

  @Input()
  cell: MapCell;

  @Output()
  closeModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.cell);
  }

  public close() {
    this.closeModal.emit();
  }

}
