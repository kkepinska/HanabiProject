import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo } from 'src/app/model/RoomInfo';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent {
  joinRoomText = "join room"
  @Input() room?: RoomInfo;
  @Input() playerName?: string;

  constructor(private router: Router) {}

  joinRoom() {
    this.router.navigate(['room', this.room?.id],
    { state: { playerName: this.playerName, roomInfo: this.room }});
  }
}
