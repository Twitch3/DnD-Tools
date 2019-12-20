import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import MapDungeon from './components/classes/MapDungeon';
import MapFloor from './components/classes/MapFloor';
import MapCell from './components/classes/MapCell';
import { SocketService } from 'src/socket.service';
import { MapViewService } from './services/map-view.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  editorMode: boolean = false;

  @Output()
  cellSelected: EventEmitter<MapCell> = new EventEmitter();

  private MOUSEBUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  private gridDomElem;
  private scaleDomElem;
  private fileInputDomElem;
  private isMouseDown: boolean = false;
  private mouseType: number;

  private leftMouseX: number;
  private leftMouseY: number;
  private leftMouseOffsetX: number = 0;
  private leftMouseOffsetY: number = 0;

  private middleMouseX: number;
  private middleMouseY: number;
  private middleMouseOffsetX: number = 0;
  private middleMouseOffsetY: number = 0;

  private scrollScale = 1;

  private mouseMovedWhileDown: boolean = false;

  public rotateCoords = {
    x: 0,
    y: 0
  };

  // TODO: Prevent grid click events in child components when moving the mouse
  // Right now, since the (click) event on the cells happens first, we can't block it here.

  @HostListener('window:click', ['$event']) onClick($event) {
    // This is largely in case there are click events farther up the DOM, but does not affect children DOM
    const buttonReleased = $event.button;
    if (this.mouseType === buttonReleased) {
      if (this.mouseMovedWhileDown) {
        $event.preventDefault();
        $event.stopPropagation();
      }
      this.isMouseDown = false;
      this.mouseMovedWhileDown = false;
    }
  }

  @HostListener('mousedown', ['$event']) onMouseDown($event) {
    if (!this.isMouseDown &&
      (!$event.target.className || $event.target.className.indexOf('map-control') < 0)) {
      this.mouseType = $event.button;
      this.isMouseDown = true;
      this.mouseMovedWhileDown = false;
      if (this.mouseType === this.MOUSEBUTTON.LEFT) {
        this.leftMouseX = $event.clientX - this.leftMouseOffsetX;
        this.leftMouseY = $event.clientY - this.leftMouseOffsetY;
      } else if (this.mouseType === this.MOUSEBUTTON.MIDDLE) {
        this.middleMouseX = $event.clientX - this.middleMouseOffsetX;
        this.middleMouseY = $event.clientY - this.middleMouseOffsetY;
      }
    }
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove($event) {
    if (this.isMouseDown) {
      this.mouseMovedWhileDown = true;
      if (this.mouseType === this.MOUSEBUTTON.LEFT) {
        this.leftMouseOffsetX = $event.clientX - this.leftMouseX;
        this.leftMouseOffsetY = $event.clientY - this.leftMouseY;
        this.updateDOMTransform();
      } else if (this.mouseType === this.MOUSEBUTTON.MIDDLE) {
        this.middleMouseOffsetX = $event.clientX - this.middleMouseX;
        this.middleMouseOffsetY = $event.clientY - this.middleMouseY;
        this.rotateCoords = {
          x: this.middleMouseOffsetX,
          y: this.middleMouseOffsetY
        };
      }
    }
  }

  @HostListener('window:mouseup', ['$event']) onMouseUp($event) {
    const buttonReleased = $event.button;
    if (this.mouseType === buttonReleased) {
      this.isMouseDown = false;
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave($event) {
    this.isMouseDown = false;
  }

  @HostListener('wheel', ['$event']) onScroll($event) {
    if (!this.isMouseDown) {
      this.scrollScale -= $event.deltaY / 1000;
      if (this.scrollScale < 0.5) {
        this.scrollScale = 0.5;
      }
      this.updateDOMTransform();
    }
  }

  @ViewChild('mapGridElem', { read: ElementRef, static: false })
  private mapGridElem: ElementRef;

  @ViewChild('scale', { read: ElementRef, static: false })
  private scale: ElementRef;

  @ViewChild('fileInput', { read: ElementRef, static: false })
  private fileInput: ElementRef;

  private dungeon: MapDungeon;
  private dungeonLevel: number = 0;
  public currentMapFloor: MapFloor;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  // TODO: Once map events such as fog of war and character movement are established- trigger socket events
  constructor(private mapViewService: MapViewService, private socketService: SocketService) { }

  ngOnInit() {
    this.mapViewService.getDungeonMap()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newDungeon: MapDungeon) => {
        if (newDungeon) {
          this.dungeon = newDungeon;
          this.currentMapFloor = this.dungeon.getDungeonFloorMap(0);
        }
      });
  }

  ngAfterViewInit() {
    // TODO: Set up a min-width/min-height to prevent the screen from being too small for the map to render correctly
    // Currently, if the window shrinks too much the map cells split
    this.gridDomElem = this.mapGridElem.nativeElement;
    this.scaleDomElem = this.scale.nativeElement;
    this.fileInputDomElem = this.fileInput.nativeElement;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // event has properties "cell: MapCell" and "middleClick?: boolean"
  handleCellSelected(event) {
    if (!this.mouseMovedWhileDown) {
      if (this.editorMode) {
        this.cellSelected.emit(event);
      } else {
        console.log(event);
      }
    }
  }

  public changeFloorView(floor: number) {
    this.currentMapFloor = this.dungeon.getDungeonFloorMap(floor);
    this.resetMapView();
  }

  public loadMapJSON() {
    this.fileInputDomElem.value = null;
    this.fileInputDomElem.click();
  }

  public handleLoadedMapJSON($event) {
    const file = $event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (readerEvent: any) => {
      const content = readerEvent.target.result;
      this.mapViewService.setMapDungeonFromSavedJSON(content.toString());
    }
  }

  public async saveMapJSON() {
    const dungeonJSON = {
      dungeonFloors: []
    };
    this.dungeon.dungeonFloors.forEach((floor: MapFloor) => {
      dungeonJSON.dungeonFloors.push(floor.getMapFloorJSON());
    });
    const fileName = "dungeon-map";
    const json = JSON.stringify(dungeonJSON);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public resetMapView() {
    this.leftMouseX = 0;
    this.leftMouseY = 0;
    this.leftMouseOffsetX = 0;
    this.leftMouseOffsetY = 0;
    this.middleMouseX = 0;
    this.middleMouseY = 0;
    this.middleMouseOffsetX = 0;
    this.middleMouseOffsetY = 0;
    this.scrollScale = 1;
    this.rotateCoords = {
      x: 0,
      y: 0
    };
    this.updateDOMTransform();
  }

  private updateDOMTransform() {
    this.gridDomElem.style['transform'] =
      'translateY(' + (this.leftMouseOffsetY / this.scrollScale) + 'px) ' +
      'translateX(' + (this.leftMouseOffsetX / this.scrollScale) + 'px)';
    this.scaleDomElem.style['transform'] = 'scale(' + this.scrollScale + ')';
  }
}
