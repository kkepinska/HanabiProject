import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { io } from 'socket.io-client';
import { RoomInfo } from '../model/RoomInfo';
import { Gamestate } from '../model/Gamestate';
import { Hand } from '../model/Hand';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private static SOCKET_PATH = 'http://18.185.170.171:8080';

  private readonly socket = io(ClientService.SOCKET_PATH);
  public readonly rooms$: Subject<RoomInfo> = new Subject<RoomInfo>();

  constructor() { }

  login(login: string): void {
    this.socket.emit("login", login);
    console.log("login() in ClientService finished\n")
  }

  onLoginResponse(): Observable<[string, string]> {
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

  public onFetchAllRoomsResponse() {
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

  public receiveUpdateRoom() {
    return new Observable<RoomInfo>((observer) => {
      this.socket.on('updateRoom', (roomInfo: RoomInfo) => {
        observer.next(roomInfo);
      });
    });
  }

  public startGame(gameId: number) {
    this.socket.emit('startGame', gameId);
  }

  recieveStartGame() {
    return new Observable<[Gamestate, Array<[string, Hand]>]>((observer) => {
      this.socket.on('startGame', (msg: [Gamestate, Array<[string, Hand]>]) => {
        let gameState = msg[0]
        let handsArray = msg[1]
        console.log("service got start game")
        console.log(gameState)
        console.log("handsArray:")
        console.log(handsArray)
        observer.next([gameState, handsArray]);
      });
    });
  }

  playCard(player: string, cardIdx: number, gameId: number) {
    this.socket.emit('playCard', player, cardIdx, gameId);
  }

  discardCard(player: string, cardIdx: number, gameId: number) {
    this.socket.emit('discardCard', player, cardIdx, gameId);
  }

  hintCard(player: string, receiver: string, 
    hintType: ("rank" | "color"), hintValue: number, gameId: number) {
    this.socket.emit('hintCard', player, receiver, hintType, hintValue, gameId);
  }

  recieveUpdate() {
    return new Observable<[Gamestate, Array<[string, Hand]>]>((observer) => {
      this.socket.on('update', (msg: [Gamestate, Array<[string, Hand]>]) => {
        let gameState = msg[0]
        let handsArray = msg[1]
        console.log("service got update game")
        console.log(gameState)
        console.log("handsArray:")
        console.log(handsArray)
        observer.next([gameState, handsArray]);
      });
    });
  }

  public deleteRoom(): Observable<number> {
    return new Observable<number>((observer) => {
        this.socket.on('deleteRoom', (roomId: number) => {
            observer.next(roomId)
        })
    })
  }
}
