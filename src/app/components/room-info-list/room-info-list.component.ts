import { Component, Input, OnInit } from '@angular/core';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room-info-list',
  templateUrl: './room-info-list.component.html',
  styleUrls: ['./room-info-list.component.scss']
})
export class RoomInfoListComponent implements OnInit {
  @Input() playerName?: string;
  roomList: RoomInfo[] = []
  createRoomText: string = "create new room";

  constructor(
    private clientService: ClientService
  ) {}

  ngOnInit(){
    this.clientService.fetchAllRooms();
    this.clientService.onfetchAllRoomsResponse()
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
