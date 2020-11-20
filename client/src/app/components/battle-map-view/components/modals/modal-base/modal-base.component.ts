import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {

  public static MODAL_TYPES = {
    TOKEN: 'token'
  };

  @Input()
  public modalOpen: boolean = false;

  @Input()
  public modalType: string;

  @Output()
  public modalSubmit: EventEmitter<any> = new EventEmitter();

  public currentModalType: string;

  constructor() { }

  ngOnInit(): void {
  }

  public openModal() {
      this.modalOpen = true;
  }

  public tokenFormSubmitted(tokenForm) {
    this.modalSubmit.emit(tokenForm);
    this.modalOpen = false;
  }

}
