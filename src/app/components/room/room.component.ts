import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  roomInfo?: RoomInfo;
  roomId: number;
  playerName?: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
  ) {
    var state: any = this.router.getCurrentNavigation()?.extras.state
    this.playerName = state["playerName"]
    this.roomInfo = state["roomInfo"]
    this.roomId = this.roomInfo?.id !== undefined? this.roomInfo.id : 0
  }

  ngOnInit() {
    this.clientService.joinRoom(this.roomId, 
      this.playerName !== undefined? this.playerName : "check")
  }

  
}
