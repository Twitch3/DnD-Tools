import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/socket.service';

@Component({
  selector: 'app-socket-error-bar',
  templateUrl: './socket-error-bar.component.html',
  styleUrls: ['./socket-error-bar.component.scss']
})
export class SocketErrorBarComponent implements OnInit {

  public hasSocketError = false;
  public dismissBar = false;
  public connectedText = 'Not Connected';
  public statusClass = '';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.getSocketErrorObservable().subscribe(err => {
      if (err) {
        this.connectedText = 'Disconnected';
        this.statusClass = 'disconnected';
        this.hasSocketError = true;
        this.dismissBar = false;
      }
    });

    this.socketService.getSocketConnectionObservable().subscribe(res => {
      if (res === null) {
        this.connectedText = 'Connecting';
        this.statusClass = 'connecting';
      } else {
        // TOTO: Currently res is undefined- investigate on server
        // console.log(res);
        this.connectedText = 'Connected';
        this.statusClass = 'connected';
      }
    });
  }

  public retrySocketConnection() {
    this.hasSocketError = false;
    this.socketService.attemptConnection();
  }

  public dismissErrorBar() {
    this.dismissBar = true;
  }

}
