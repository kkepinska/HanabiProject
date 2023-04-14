import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  readonly roomInfo?: RoomInfo;
  readonly roomId: number;
  readonly playerName?: string;

  constructor(
    private readonly router: Router,
    private readonly clientService: ClientService,
  ) {
    var state: any = this.router.getCurrentNavigation()?.extras.state
    this.playerName = state["playerName"]
    this.roomInfo = state["roomInfo"]
    this.roomId = this.roomInfo?.id !== undefined? this.roomInfo.id : 0
  }

  ngOnInit() {
    if (this.playerName !== undefined) {
      this.clientService.joinRoom(this.roomId, this.playerName)
    }
  }
}
