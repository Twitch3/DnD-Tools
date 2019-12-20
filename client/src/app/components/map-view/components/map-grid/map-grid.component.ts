import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import MapCell from '../classes/MapCell';
import MapFloor from '../classes/MapFloor';

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  mapFloor: MapFloor;

  @Input()
  rotateCoords: any;

  @Input()
  cellSize: number = 80;

  @Output()
  cellSelected = new EventEmitter();

  private domElem;

  @ViewChild('grid', { read: ElementRef, static: false })
  private gridElem: ElementRef;

  private initialRotateX: number = 60;
  private initialRotateY: number = 0;
  private initialRotateZ: number = -45;

  private rotateX: number = 0;
  private rotateY: number = 0;
  private rotateZ: number = 0;

  public map: MapCell[][] = [];

  constructor() { }

  ngOnInit() {
    if (this.mapFloor) {
      this.map = this.mapFloor.getCellArray();
    } 
  }

  ngAfterViewInit() {
    this.domElem = this.gridElem.nativeElement;
    this.rotateGrid();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.rotateCoords) {
        this.rotateGrid();
      }
      if (changes.mapFloor) {
        this.map = this.mapFloor.getCellArray();
      }
    }
  }

  public cellClick(cell: MapCell) {
    this.cellSelected.emit({
      cell: cell
    });
  }

  public auxClick($event, cell: MapCell) {
    this.cellSelected.emit({
      cell: cell,
      middleClick: true
    });
  }

  private rotateGrid() {
    if (this.domElem) {
      this.rotateZ = -this.rotateCoords.x / 9 + this.initialRotateZ;
      this.rotateX = -this.rotateCoords.y / 9 + this.initialRotateX;
      if (this.rotateX > 90) {
        this.rotateX = 90;
      } else if (this.rotateX < 0) {
        this.rotateX = 0;
      }

      this.domElem.style['transform'] = 'rotateX(' + this.rotateX + 'deg) rotateZ(' + this.rotateZ + 'deg)';
    }
  }

}
