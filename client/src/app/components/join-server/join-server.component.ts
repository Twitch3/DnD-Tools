import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from 'src/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-server',
  templateUrl: './join-server.component.html',
  styleUrls: ['./join-server.component.scss']
})
export class JoinServerComponent implements OnInit, OnDestroy {

  public serverAddress: string = '192.168.1.8';
  public userName: string;
  public userColor: string;
  public connectionSubscription;

  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit() {
    this.connectionSubscription = this.socketService.getSocketConnectionObservable().subscribe(res => {
      if (res !== null) {
        this.router.navigate(['/map']);
      }
    });
  }

  public joinServer() {
    const address = 'http://' + this.serverAddress + ':3000';
    this.socketService.connectSocket(address, this.userName, this.userColor);
  }

  ngOnDestroy() {
    this.connectionSubscription.unsubscribe();
  }

}
