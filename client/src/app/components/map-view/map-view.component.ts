import {
  Component, OnInit, AfterViewInit, HostListener, ViewChild,
  ElementRef, Input, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { SocketService } from 'src/socket.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  editorMode: boolean = false;

  @Output()
  cellSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef<HTMLInputElement>;

  private MOUSEBUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  public tempDungeon: number[][][] = [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];

  // TODO: Once map events such as fog of war and character movement are established- trigger socket events
  constructor(private socketService: SocketService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  public loadMapJSON() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  public handleLoadedMapJSON($event) {
    const file = $event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (readerEvent: any) => {
      const content = readerEvent.target.result;
      // TODO: Load from file here
    };
  }

  public async saveMapJSON() {

    const dungeonJSON = {};
    const fileName = 'dungeon-map';
    const json = JSON.stringify(dungeonJSON);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public resetMapView() {
    console.log('Reset Map View');
  }
}
