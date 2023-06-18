import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room-info-list',
  templateUrl: './room-info-list.component.html',
  styleUrls: ['./room-info-list.component.scss']
})
export class RoomInfoListComponent implements OnInit {
  public static readonly MODE_NAME_TO_MODE = new Map([
    ["basic", "basic"],
    ["small", "small"],
    ["rainbow", "rainbow"],
    ["black", "black"],
    ["rainbow critical", "rainbow_c"],
    ["black critical", "black_c"],
    ["rainbow + black", "hard"],
    ["rainbow + black critical", "hard_c"] 
  ])

  public static readonly MODE_TO_MODE_NAME = new Map([
    ["basic", "basic"],
    ["small", "small"],
    ["rainbow", "rainbow"],
    ["black", "black"],
    ["rainbow_c", "rainbow critical"],
    ["black_c", "black critical"],
    ["hard", "rainbow + black"],
    ["hard_c", "rainbow + black critical"] 
  ])

  public static readonly PLAYER_COUNTS = [2, 3, 4, 5]

  mode?: string = undefined
  playerCount?: number = undefined

  public readonly createRoomText = "create new room";

  @Input() public playerName?: string;
  public roomList: Array<RoomInfo> = []

  public constructor(
    private readonly clientService: ClientService,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.fetchAllRooms()
    this.receiveGetNewRoom()
    this.receiveGetJoinRoom()
    this.receiveDeleteRoom()
  }

  private fetchAllRooms() {
    this.clientService.fetchAllRooms();
    this.clientService.onFetchAllRoomsResponse().pipe(first())
      .subscribe((roomInfoList: RoomInfo[]) => this.roomList.push(...roomInfoList))
  }

  private receiveGetNewRoom(): void {
    this.clientService.getNewRoom().subscribe((roomInfo: RoomInfo) => {
        this.roomList.push(roomInfo);
    })
  }

  private receiveGetJoinRoom(): void{
    this.clientService.getJoinRoom().subscribe((updatedRoom: RoomInfo) => {
        this.roomList = this.roomList
          .map(room => room.id !== updatedRoom.id? room : updatedRoom);
    })
  }

  private receiveDeleteRoom(): void {
    this.clientService.deleteRoom().subscribe((deletedRoomId: number) => {
        this.roomList = this.roomList.filter((room) => room.id != deletedRoomId)
    })
  }

  public createNewRoom(): void {
    console.log("In createNewRoom()")
    if (this.mode !== undefined && this.playerCount !== undefined) {
      console.log('Creating new room (', this.mode, this.playerCount, ")")
      this.clientService.createRoom(true, this.mode, this.playerCount)
      this.clientService.getCreatedRoom().subscribe((roomInfo: RoomInfo) => {
        this.router.navigate(['room', roomInfo.id],
        { state: { 
          playerName: this.playerName, 
          roomInfo: roomInfo
        }})
      })
    }
  }

  public getGameModeNames(): Array<string> {
    return Array.from(RoomInfoListComponent.MODE_NAME_TO_MODE.keys())
  }

  public getModeName(mode: string): string | undefined {
    return RoomInfoListComponent.MODE_TO_MODE_NAME.get(mode)
  }

  public setMode(modeName: string): void {
    console.log("Setting mode", modeName)
    this.mode = RoomInfoListComponent.MODE_NAME_TO_MODE.get(modeName)
  }

  public getPlayerConuts(): Array<number> {
    return RoomInfoListComponent.PLAYER_COUNTS
  }

  public setPlayerCount(playerCount: number): void {
    this.playerCount = playerCount
  }
}
