import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

// TODO: Eventually this Service will serve as our base connection to the SocketIO- not just for chat
export class SocketService {
    private url = 'http://localhost:3000';
    private socket;
    private messageSubject = new BehaviorSubject<any>({});
    private socketErrorSubect = new BehaviorSubject<any>(null);

    constructor() {
        this.socket = io(this.url, {reconnection: false});

        const service = this; // Scope trick to access the service from within the SocketIO events
        
        this.socket.io.on('connect_error', (err) => {
            // Handle server error here and setup reconnect hook
            service.socketErrorSubect.next(err);
        });

        this.socket.on('disconnect', (err) => {
            // Handle if we disconnect (without direct error) and setup reconnect hook
            service.socketErrorSubect.next(err);
        });
    }

    public sendMessage(message: string) {
        if (this.socket.connected) {
            this.socket.emit('new-message', message);
        }
    }

    public getMessages() {
        // TODO: Change to return the same observable isntead of a new one each time to allow us to control what we send when the socket is DC'd
        return Observable.create((observer) => {
            
        });
    }

    public getSocketErrorObservable(): Observable<any> {
        return this.socketErrorSubect.asObservable();
    }

    public attemptConnection() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }
}