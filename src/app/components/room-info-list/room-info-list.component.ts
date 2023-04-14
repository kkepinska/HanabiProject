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
  readonly createRoomText = "create new room";

  @Input() playerName?: string;
  roomList: RoomInfo[] = []

  constructor(
    private readonly clientService: ClientService
  ) {}

  ngOnInit(){
    this.clientService.fetchAllRooms();
    this.clientService.onFetchAllRoomsResponse().pipe(first())
      .subscribe((roomInfoList: RoomInfo[]) => this.roomList.push(...roomInfoList))
    this.clientService.getNewRoom().subscribe((roomInfo: RoomInfo) => {
      this.roomList.push(roomInfo);
    })
    this.clientService.getJoinRoom().subscribe((updatedRoom: RoomInfo) => {
      this.roomList = this.roomList
        .map(room => room.id !== updatedRoom.id? room : updatedRoom);
    })
  }

  createNewRoom() {
    this.clientService.createRoom(true)
  }
}
