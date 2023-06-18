import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';
import { FormatterService } from 'src/app/service/formatter.service';

@Component({
  selector: 'app-room-info-list',
  templateUrl: './room-info-list.component.html',
  styleUrls: ['./room-info-list.component.scss']
})
export class RoomInfoListComponent implements OnInit {
  public static readonly PLAYER_COUNTS = [2, 3, 4, 5]

  mode?: string = undefined
  playerCount?: number = undefined

  @Input() public playerName?: string;
  public roomList: Array<RoomInfo> = []

  public constructor(
    private readonly clientService: ClientService,
    private readonly formatterService: FormatterService,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.receiveAllRooms()
    this.receiveDeleteRoom()
  }

  private receiveAllRooms() {
    this.clientService.fetchAllRooms();
    this.clientService.onFetchAllRoomsResponse()
      .subscribe((roomInfoList: RoomInfo[]) => this.roomList = roomInfoList)
  }

  private receiveDeleteRoom(): void {
    this.clientService.deleteRoom().subscribe((deletedRoomId: number) => {
        this.roomList = this.roomList.filter((room) => room.id != deletedRoomId)
    })
  }

  public createNewRoom(): void {
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
    return this.formatterService.getGameModeNames()
  }

  public getModeName(mode: string): string | undefined {
    return this.formatterService.getModeName(mode)
  }

  public setMode(modeName: string): void {
    console.log("Setting mode", modeName)
    this.mode = this.formatterService.getMode(modeName)
  }

  public getPlayerConuts(): Array<number> {
    return RoomInfoListComponent.PLAYER_COUNTS
  }

  public setPlayerCount(playerCount: number): void {
    this.playerCount = playerCount
  }
}
