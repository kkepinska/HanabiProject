import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room-info-list',
  templateUrl: './room-info-list.component.html',
  styleUrls: ['./room-info-list.component.scss']
})
export class RoomInfoListComponent implements OnInit {
  public readonly createRoomText = "create new room";

  @Input() public playerName?: string;
  public roomList: Array<RoomInfo> = []

  public constructor(
    private readonly clientService: ClientService
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

  public createNewRoom() {
    this.clientService.createRoom(true)
  }
}
