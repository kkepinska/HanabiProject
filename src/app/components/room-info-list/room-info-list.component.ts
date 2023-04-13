import { Component, OnInit } from '@angular/core';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room-info-list',
  templateUrl: './room-info-list.component.html',
  styleUrls: ['./room-info-list.component.scss']
})
export class RoomInfoListComponent implements OnInit {
  roomList: RoomInfo[] = [
    { 
      id: 10,
      playerCount : 2,
      players: ['player1', 'name'],
      isPublic : true,
    },
    { 
      id: 342,
      playerCount : 4,
      players: ['aa', '12player', 'okok', 'bb2'],
      isPublic : true,
    },
    { 
      id: 993,
      playerCount : 0,
      players: [],
      isPublic : true,
    },
  ]
  createRoomText: string = "create new room";

  constructor(
    private clientService: ClientService
  ) {}

  ngOnInit(){
    this.clientService.getNewRoom().subscribe((roomInfo: RoomInfo) => {
      this.roomList.push(roomInfo);
    })
  }

  createNewRoom() {
    this.clientService.createRoom(true)
  }
}
