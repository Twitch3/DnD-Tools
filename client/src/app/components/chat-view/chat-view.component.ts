import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/socket.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  public message: string;
  public messages: string[] = [];

  constructor(private chatService: SocketService) { }

  public ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  
  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
