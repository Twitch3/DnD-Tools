import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/socket.service';

@Component({
  selector: 'app-socket-error-bar',
  templateUrl: './socket-error-bar.component.html',
  styleUrls: ['./socket-error-bar.component.scss']
})
export class SocketErrorBarComponent implements OnInit {

  public hasSocketError = false;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getSocketErrorObservable().subscribe(err => {
      if (err) {
        this.hasSocketError = true;
      }
    });
  }

  public retrySocketConnection() {
    this.hasSocketError = false;
    this.socketService.attemptConnection();
  }

}
