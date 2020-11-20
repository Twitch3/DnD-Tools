import { Directive, HostListener, ElementRef, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

export interface DragCoords {
  x: number;
  y: number;
}

@Directive({
  selector: '[appDragToMove]'
})
export class DragToMoveDirective implements AfterContentInit {

  @Input()
  private scale: number = 0;

  @Input()
  public coordinates: DragCoords = {
    x: 0,
    y: 0
  };

  @Output()
  public dragged: EventEmitter<any> = new EventEmitter();

  private domElement: HTMLElement;

  private isMouseDown: boolean = false;
  private didMouseMove: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private deltaX: number = 0;
  private deltaY: number = 0;
  private translateX: number = 0;
  private translateY: number = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    this.isMouseDown = true;
    this.didMouseMove = false;
    this.deltaX = 0;
    this.deltaY = 0;
    this.startX = evt.clientX;
    this.startY = evt.clientY;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt) {
    if (this.isMouseDown) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      this.isMouseDown = false;
      this.coordinates.x += this.deltaX;
      this.coordinates.y += this.deltaY;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(evt: MouseEvent) {
    if (this.isMouseDown) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      this.didMouseMove = true;
      this.deltaX = (evt.clientX - this.startX) / this.scale;
      this.deltaY = (evt.clientY - this.startY) / this.scale;
      this.domElement.style.transform = 'translate(' +
        (this.coordinates.x + this.deltaX) + 'px, ' +
        (this.coordinates.y + this.deltaY) + 'px)';
      this.dragged.emit();
    }
  }

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    if (this.didMouseMove) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  constructor(el: ElementRef) {
    this.domElement = el.nativeElement as HTMLElement;
  }

  ngAfterContentInit() {
    if (this.coordinates) {
      this.domElement.style.transform = 'translate(' +
        (this.coordinates.x) + 'px, ' +
        (this.coordinates.y) + 'px)';
    }
  }

}
