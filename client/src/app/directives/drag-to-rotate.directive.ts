import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragToRotate]'
})
export class DragToRotateDirective {

  private domElem;
  private isMouseDown: boolean = false;
  private mouseX: number;
  private mouseY: number;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private isClick: boolean = true;

  @HostListener('window:click', ['$event']) onClick($event) {
    if (!this.isClick) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.isMouseDown = false;
    this.isClick = true;
  }

  @HostListener('mousedown', ['$event']) onMouseDown($event) {
    this.isMouseDown = true;
    this.mouseX = $event.clientX - this.offsetX;
    this.mouseY = $event.clientY - this.offsetY;
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove($event) {
    if (this.isMouseDown) {
      this.offsetX = $event.clientX - this.mouseX;
      this.offsetY = $event.clientY - this.mouseY;
      this.isClick = false;
      this.domElem.style['transform'] = 'rotateY('  + this.offsetX + 'deg) rotateX(' + (-this.offsetY) + 'deg)';
    }
  }

  @HostListener('window:mouseup', ['$event']) onMouseUp($event) {
    
  }

  constructor(elementRef: ElementRef) {
    this.domElem = elementRef.nativeElement;
  }

}
