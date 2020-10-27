import * as io from 'socket.io-client';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injectable } from "@angular/core";

// TODO: Eventually this Service will serve as our base connection to the SocketIO- not just for chat
@Injectable()
export class SocketService {
    private url = 'http://192.168.1.8:3000';
    private socket;
    private messageSubject = new BehaviorSubject<any>({});
    private mapSubject = new ReplaySubject<any[]>();
    private socketErrorSubect = new ReplaySubject<any>();
    private socketConnectSubect = new ReplaySubject<any>();
    private manualDisconnect: boolean = false;
    constructor() {
    }

    public resetSubjects() {
        this.messageSubject = new BehaviorSubject<any>({});
        this.mapSubject = new ReplaySubject<any[]>();
        this.socketErrorSubect = new ReplaySubject<any>();
        this.socketConnectSubect = new ReplaySubject<any>();
    }

    public connectSocket(url?: string, userName?: string, color?: string) {
        if (this.socket) {
            this.manualDisconnect = true;
            this.socket.disconnect();
        }
        const queryObj = {
            userName,
            color
        };
        this.socket = io(url ? url : this.url, { reconnection: false, query: queryObj });

        const service = this; // Scope trick to access the service from within the SocketIO events
        service.socketConnectSubect.next(null);

        this.socket.io.on('connect_error', (err) => {
            // Handle server error here and setup reconnect hook
            service.socketErrorSubect.next(err);
        });

        this.socket.on('connect', (res) => {
            this.manualDisconnect = false;
            service.socketConnectSubect.next(res);
        });

        this.socket.on('disconnect', (err) => {
            // Handle if we disconnect (without direct error) and setup reconnect hook
            if (!this.manualDisconnect) {
                service.socketErrorSubect.next(err);
            }
        });

        this.socket.on('dungeon-update', (mapData) => {
            if (mapData.senderId !== this.socket.id) {
                service.mapSubject.next(mapData);
            }
        });
        console.log(this.socket);
    }

    public sendMessage(message: string) {
        if (this.socket.connected) {
            this.socket.emit('new-message', message);
        }
    }

    public sendMapUpdate(mapData) {
        if (this.socket.connected) {
            mapData.senderId = this.socket.id;
            this.socket.emit('dungeon-update', mapData);
        }
    }

    public getMessages() {
        // TODO: Change to return the same observable isntead of a
        // new one each time to allow us to control what we send when the socket is DC'd
        return new Observable((observer) => {

        });
    }

    public getMapUpdateObservable(): Observable<any> {
        return this.mapSubject;
    }

    public getSocketErrorObservable(): Observable<any> {
        return this.socketErrorSubect.asObservable();
    }

    public getSocketConnectionObservable(): Observable<any> {
        return this.socketConnectSubect.asObservable();
    }

    public attemptConnection() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }
}
