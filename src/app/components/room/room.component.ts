import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo } from 'src/app/model/RoomInfo';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  roomInfo?: RoomInfo;
  playerName?: string;

  constructor(
    private router: Router
  ) {
    var state: any = this.router.getCurrentNavigation()?.extras.state
    this.playerName = state["playerName"]
    this.roomInfo = state["roomInfo"]
  }
}
