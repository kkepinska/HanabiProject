import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { io } from 'socket.io-client';
import { RoomInfo } from '../model/RoomInfo';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private socket = io('http://localhost:8080');
  public rooms$: Subject<RoomInfo> = new Subject<RoomInfo>();

  constructor() { }

  login(login: string): void {
    this.socket.emit("login", login);
    console.log("login() in ClientService finished\n")
  }

  onLoginResponse() {
    return new Observable<[string, string]>(observer => {
      this.socket.on('login', msg => {
        observer.next(msg);
      });
    });
  }

  public fetchAllRooms() {
    console.log('fetching all rooms in service')
    this.socket.emit('fetchAllRooms');
  }

  public onfetchAllRoomsResponse() {
    console.log('fetched all rooms in service from server')
    return new Observable<RoomInfo[]>(observer => {
      this.socket.on('fetchAllRooms', msg => {
        observer.next(msg);
      });
    });
  }

  public createRoom(isPublic: boolean) {
    console.log('creating new room in service')
    this.socket.emit('createRoom', isPublic);
  }

  public joinRoom(roomId: number, playerName: string) {
    console.log('joining room in service')
    this.socket.emit('joinRoom', roomId, playerName);
  }

  public getNewRoom() {
    this.socket.on('newRoom', (roomInfo: RoomInfo) =>{
      this.rooms$.next(roomInfo);
    });
    return this.rooms$.asObservable();
  };

  public getJoinRoom() {
    this.socket.on('jonRoom', (updatedRoom: RoomInfo) =>{
      this.rooms$.asObservable().pipe(
        map(room => room.id !== updatedRoom.id? room : updatedRoom)
      )
    });
    return this.rooms$.asObservable();
  };
}
